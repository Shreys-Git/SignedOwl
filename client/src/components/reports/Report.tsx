import { Box } from "@mui/material";
import { CategoryFrequenciesPanel } from "./ReportSidePanel";
import { useEffect, useState } from "react";
import { Stat } from "../files/Files";
import { StatCard } from "../common/StatCard";
import axios from "axios";
import { Agreement } from "../files/NavFileGrid";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import PeopleIcon from "@mui/icons-material/People";
import BrushIcon from "@mui/icons-material/Brush";
import { PageHeader } from "../common/PageHeader";
import { BarData, DateBarChart } from "./DateBarChart";
import { CategoryCount } from "./ReportSidePanel";

const cards = [
  { id: 1, title: "Title 1", description: "Description 1", quantity: "$12000" },
  { id: 1, title: "Title 1", description: "Description 1", quantity: "$12000" },
  { id: 1, title: "Title 1", description: "Description 1", quantity: "$12000" },
];
const colors = ["#f8ecfc", "#f8e6f6", "#f8e9ee"];

export const Report = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [isStatLoading, setIsStatLoading] = useState(false);
  const [barData, setBarData] = useState<BarData[]>([]);
  const [categoryFrequency, setCategoryFrequency] = useState<CategoryCount[]>(
    []
  );

  const calculateFrequencies = (data: Agreement[]): CategoryCount[] => {
    // Create a map to count frequencies
    const frequencyMap = new Map<string, number>();

    // Count frequencies
    data.forEach((agreement) => {
      const category = agreement.navigator_extractions?.category;
      if (category) {
        frequencyMap.set(category, (frequencyMap.get(category) || 0) + 1);
      }
    });

    // Convert map to array and sort by frequency in descending order
    const sortedFrequencies: CategoryCount[] = Array.from(
      frequencyMap.entries()
    )
      .map(([category, frequency]) => ({
        category,
        frequency,
      }))
      .sort((a, b) => {
        // Sort by frequency first (descending)
        if (b.frequency !== a.frequency) {
          return b.frequency - a.frequency;
        }
        // If frequencies are equal, sort alphabetically by category
        return a.category.localeCompare(b.category);
      });

    return sortedFrequencies;
  };

  const calculateBarChartData = (data: Agreement[]): BarData[] => {
    // Create a map to store counts by month
    const monthCounts = new Map();

    // Get current date
    const now = new Date();
    // Get last 6 months
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setMonth(now.getMonth() - i);
      const monthKey = date.toLocaleString("default", { month: "short" });
      monthCounts.set(monthKey, {
        month: monthKey,
        effective: 0,
        execution: 0,
      });
    }

    // Count documents by month
    data.forEach((agreement) => {
      const effectiveDate =
        agreement.navigator_extractions?.provisions?.effective_date;
      const executionDate =
        agreement.navigator_extractions?.provisions?.execution_date;

      if (effectiveDate) {
        const month = new Date(effectiveDate).toLocaleString("default", {
          month: "short",
        });
        if (monthCounts.has(month)) {
          monthCounts.get(month).effective += 1;
        }
      }

      if (executionDate) {
        const month = new Date(executionDate).toLocaleString("default", {
          month: "short",
        });
        if (monthCounts.has(month)) {
          monthCounts.get(month).execution += 1;
        }
      }
    });

    // Convert map to array and reverse to show most recent months first
    return Array.from(monthCounts.values()).reverse();
  };

  const calculateCardStats = (data: Agreement[]): any[] => {
    // Get signatures in review
    const signaturesInReview = data.filter(
      (doc) => doc.signature_metadata?.signature_status === "review"
    ).length;

    // Get documents with effective dates in next 6 months
    const now = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(now.getMonth() + 6);

    const upcomingEffectiveDocs = data.filter((doc) => {
      const effectiveDate =
        doc.navigator_extractions?.provisions?.effective_date;
      if (!effectiveDate) return false;
      const date = new Date(effectiveDate);
      return date >= now && date <= sixMonthsFromNow;
    }).length;

    // Get unique parties count
    const uniqueParties = new Set(
      data
        .flatMap((doc) =>
          doc.navigator_extractions?.parties?.map(
            (party) => party.name_in_agreement
          )
        )
        .filter(Boolean)
    );

    return [
      {
        title: "Pending Within 6 Months",
        value: upcomingEffectiveDocs.toString(),
        delta: 0,
        icon: <EditCalendarIcon />,
      },
      {
        title: "Unique Parties",
        value: uniqueParties.size.toString(),
        delta: 0,
        icon: <PeopleIcon />,
      },
      {
        title: "Need Approval",
        value: signaturesInReview.toString(),
        delta: 0,
        icon: <BrushIcon />,
      },
    ];
  };
  useEffect(() => {
    const fetchDocumentDetails = async () => {
      setIsStatLoading(true);
      try {
        const response = await axios.get<Agreement[]>(
          "http://localhost:8000/v1/documents/files/ALL/LATEST"
        );

        if (response.status == 200) {
          setAgreements(response.data);
          setStats(calculateCardStats(response.data));
          setBarData(calculateBarChartData(response.data));
          setCategoryFrequency(calculateFrequencies(response.data));
          console.log("response is: ", response);
          console.log("agreement is", agreements);
        } else {
          setStats([]);
        }
      } catch (error) {
        alert(
          "You need to provide Esign and Nav permissions from the top right corner"
        );
      } finally {
        setIsStatLoading(false);
      }
    };
    fetchDocumentDetails();
  }, []);
  return (
    <Box display="flex">
      <Box flexGrow={1}>
        <PageHeader
          title="Risk Report"
          description="Better understanding of your agreement data"
        />
        <Box
          display="flex"
          alignContent={"space-between"}
          gap={2}
          mb={2}
          p={1}
          sx={{ position: "relative", zIndex: 1 }}
        >
          {stats.map((stat) => (
            <StatCard
              title={stat.title}
              value={stat.value}
              delta={stat.delta}
              icon={stat.icon}
            />
          ))}
        </Box>
        <Box display="flex">
          <DateBarChart barStats={barData} />
          <CategoryFrequenciesPanel categoryFrequencies={categoryFrequency} />
        </Box>
      </Box>
    </Box>
  );
};

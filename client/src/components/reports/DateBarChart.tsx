// import React, { useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { Agreement } from "../files/NavFileGrid";
// import { Card, CardContent, CardHeader, Typography } from "@mui/material";

// interface Props {
//   agreements: Agreement[];
// }

// export const RiskReport: React.FC<Props> = ({ agreements }) => {
//   const processData = (data: Agreement[]) => {
//     // Create a map to store counts by month
//     const monthCounts = new Map();

//     // Get current date
//     const now = new Date();
//     // Get last 6 months
//     for (let i = 0; i < 6; i++) {
//       const date = new Date();
//       date.setMonth(now.getMonth() - i);
//       const monthKey = date.toLocaleString("default", { month: "short" });
//       monthCounts.set(monthKey, {
//         month: monthKey,
//         effective: 0,
//         execution: 0,
//       });
//     }

//     // Count documents by month
//     data.forEach((agreement) => {
//       const effectiveDate =
//         agreement.navigator_extractions?.provisions?.effective_date;
//       const executionDate =
//         agreement.navigator_extractions?.provisions?.execution_date;

//       if (effectiveDate) {
//         const month = new Date(effectiveDate).toLocaleString("default", {
//           month: "short",
//         });
//         if (monthCounts.has(month)) {
//           monthCounts.get(month).effective += 1;
//         }
//       }

//       if (executionDate) {
//         const month = new Date(executionDate).toLocaleString("default", {
//           month: "short",
//         });
//         if (monthCounts.has(month)) {
//           monthCounts.get(month).execution += 1;
//         }
//       }
//     });

//     // Convert map to array and reverse to show most recent months first
//     return Array.from(monthCounts.values()).reverse();
//   };

//   const chartData = processData(agreements);
//   useEffect(() => {
//     console.log("Processed Data", processData(agreements));
//   });
//   return (
//     <Card>
//       <CardHeader>
//         <Typography>Document Timeline</Typography>
//       </CardHeader>
//       <CardContent>
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={chartData}
//             margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//             <XAxis dataKey="month" stroke="#fff" tick={{ fill: "#fff" }} />
//             <YAxis stroke="#fff" tick={{ fill: "#fff" }} />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "#2a2d2f",
//                 border: "none",
//                 borderRadius: "8px",
//                 color: "#fff",
//               }}
//             />
//             <Legend wrapperStyle={{ color: "#fff" }} />
//             <Bar
//               dataKey="effective"
//               name="Effective Date"
//               fill="#6366f1"
//               radius={[4, 4, 0, 0]}
//             />
//             <Bar
//               dataKey="execution"
//               name="Execution Date"
//               fill="#22c55e"
//               radius={[4, 4, 0, 0]}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// };

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Agreement } from "../files/NavFileGrid";
import { Box } from "@mui/material";

const data = [
  { month: "January", date1: 10, date2: 15 },
  { month: "February", date1: 12, date2: 18 },
  { month: "March", date1: 14, date2: 20 },
  { month: "April", date1: 16, date2: 22 },
  { month: "May", date1: 18, date2: 24 },
  { month: "June", date1: 20, date2: 26 },
  { month: "July", date1: 22, date2: 28 },
  { month: "August", date1: 24, date2: 30 },
  { month: "September", date1: 26, date2: 32 },
  { month: "October", date1: 28, date2: 34 },
  { month: "November", date1: 30, date2: 36 },
  { month: "December", date1: 32, date2: 38 },
];

export interface BarData {
  month: string;
  effective: number;
  execution: number;
}
interface BarChartProps {
  barStats: BarData[];
}

export const DateBarChart = ({ barStats }: BarChartProps) => {
  const processData = (data: Agreement[]) => {
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
  return (
    <BarChart
      width={800}
      height={400}
      data={barStats}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="effective" fill="#2f27ce" name="Upcoming Effective Dates" />
      <Bar dataKey="execution" fill="#dddbff" name="Upcoming Execution Dates" />
    </BarChart>
  );
};

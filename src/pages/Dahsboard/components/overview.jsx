import {Bar, LineChart , BarChart, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import { useEffect, useState } from 'react'

const data = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Feb',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Mar',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Apr',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'May',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jun',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jul',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Aug',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Sep',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Oct',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Nov',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Dec',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
]
export const getMonthName = (Month) => {
  const months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ]

  return months[Month - 1]
}

export function Overview({ data }) {
  console.log(data)
  const [usedData, setUsedData] = useState()
  useEffect(() => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()

    // Filter data for the current year
    const dataForCurrentYear = data?.filter(
      (entry) => entry.year === currentYear,
    )

    let newData = []

    // Initialize newData with default values
    for (let i = 0; i < 12; i++) {
      newData[i] = { name: getMonthName(i + 1), total: 0, year: currentYear }
    }

    // Update newData with data from the filtered 'dataForCurrentYear'
    dataForCurrentYear?.forEach((entry) => {
      const monthIndex = entry.month - 1 // Adjust for zero-based indexing
      const monthName = getMonthName(entry.month)
      newData[monthIndex] = {
        name: monthName,
        total: parseInt(entry.total_revenue),
        year: entry.year,
      }
    })

    console.log('newdata', newData)
    // Now you can update the state once with the new data
    setUsedData(newData)
  }, [data])

  console.log(usedData)
  return (
    <div className={'w-full flex flex-wrap lg:flex-nowrap'}>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={usedData}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar
            dataKey="total"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          width={500}
          height={300}
          data={usedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

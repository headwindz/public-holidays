# Public Holidays API

A comprehensive public holidays API providing holiday data for 60 countries and regions across multiple years (2020-2025). Built with Next.js and TypeScript.

🌐 **Doc**: [https://public-holidays.toolhub.run/](https://public-holidays.toolhub.run/)

## Features

- 🌍 **60 Countries & Regions** - Comprehensive coverage of public holidays worldwide
- 📅 **Multiple Years** - Data available for 2020, 2021, 2022, 2023, 2024, and 2025
- 🚀 **Fast API** - Built on Next.js API routes for optimal performance
- 🎨 **Interactive Documentation** - Built-in API tester and documentation
- 📱 **Responsive Design** - Works seamlessly on all devices

## Supported Countries

The API covers 60 countries and regions including:

- 🇨🇳 China (cn)
- 🇺🇸 United States (us)
- 🇬🇧 United Kingdom (uk)
- 🇨🇦 Canada (ca)
- 🇦🇺 Australia (au)
- 🇩🇪 Germany (de)
- 🇫🇷 France (fr)
- 🇯🇵 Japan (jp)
- 🇮🇳 India (in)
- 🇧🇷 Brazil (br)
- 🇲🇽 Mexico (mx)
- And 48 more...

See the [data directory](./data/2025) for the complete list of country codes.

## API Usage

### Endpoint

```
GET https://public-holidays.toolhub.run/api/public-holidays?year={year}&code={code}
```

### Parameters

- `year` (required) - The year for which to retrieve holidays (e.g., 2020, 2021, 2022, 2023, 2024, 2025)
- `code` (required) - The ISO 3166-1 alpha-2 country/region code (e.g., cn, us, uk, ca)

### Example Request

```bash
curl "https://public-holidays.toolhub.run/api/public-holidays?year=2025&code=cn"
```

### Example Response

```json
{
  "data": [
    {
      "localName": "元旦",
      "name": "New Year's Day",
      "code": "CN",
      "fixed": true,
      "global": true,
      "counties": null,
      "launchYear": null,
      "types": ["Public"],
      "startDate": "2025-01-01T00:00:00.000Z",
      "endDate": "2025-01-01T23:59:59.999Z"
    },
    {
      "localName": "春节",
      "name": "Spring Festival (Chinese New Year)",
      "code": "CN",
      "fixed": false,
      "global": true,
      "counties": null,
      "launchYear": null,
      "types": ["Public"],
      "startDate": "2025-01-28T00:00:00.000Z",
      "endDate": "2025-02-04T23:59:59.999Z"
    },
    {
      "localName": "清明节",
      "name": "Tomb Sweeping Day (Qingming Festival)",
      "code": "CN",
      "fixed": false,
      "global": true,
      "counties": null,
      "launchYear": null,
      "types": ["Public"],
      "startDate": "2025-04-04T00:00:00.000Z",
      "endDate": "2025-04-06T23:59:59.999Z"
    },
    {
      "localName": "劳动节",
      "name": "Labor Day",
      "code": "CN",
      "fixed": true,
      "global": true,
      "counties": null,
      "launchYear": null,
      "types": ["Public"],
      "startDate": "2025-05-01T00:00:00.000Z",
      "endDate": "2025-05-05T23:59:59.999Z"
    },
    {
      "localName": "端午节",
      "name": "Dragon Boat Festival",
      "code": "CN",
      "fixed": false,
      "global": true,
      "counties": null,
      "launchYear": null,
      "types": ["Public"],
      "startDate": "2025-05-31T00:00:00.000Z",
      "endDate": "2025-06-02T23:59:59.999Z"
    },
    {
      "localName": "国庆节 / 中秋节",
      "name": "National Day & Mid-Autumn Festival",
      "code": "CN",
      "fixed": true,
      "global": true,
      "counties": null,
      "launchYear": 1949,
      "types": ["Public"],
      "startDate": "2025-10-01T00:00:00.000Z",
      "endDate": "2025-10-08T23:59:59.999Z"
    }
  ]
}
```

### Error Responses

**400 Bad Request** - Missing required parameters

```json
{
  "error": "Both year and code parameters are required"
}
```

**404 Not Found** - Data not available for specified year/country

```json
{
  "error": "Data not found for the specified year and country/region code"
}
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/headwindz/public-holidays
cd public-holidays
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
public-holidays/
├── app/
│   ├── api/
│   │   └── public-holidays/
│   │       └── route.ts           # API endpoint
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Landing page
├── data/
│   ├── 2020/                      # 2020 holiday data
│   ├── 2021/                      # 2021 holiday data
│   ├── 2022/                      # 2022 holiday data
│   ├── 2023/                      # 2023 holiday data
│   ├── 2024/                      # 2024 holiday data
│   └── 2025/                      # 2025 holiday data
│       ├── cn/
│       │   └── index.json
│       ├── us/
│       │   └── index.json
│       └── ...                    # 60 countries total
└── package.json
```

## Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Package Manager**: pnpm
- **Runtime**: Node.js

## Data Sources

Holiday data is generated by AI and includes:

- Fixed national holidays
- Movable holidays (Easter, Lunar New Year, Ramadan, etc.)
- Holiday durations
- Bank holidays

**Note**: While the data is generated with care, please verify critical dates with official government sources for production use. If you find any discrepancies, feel free to open an issue.

## Contributing

Contributions are welcome! Please feel free to submit a [Issue](https://github.com/headwindz/public-holidays/issues) or [Pull Request](https://github.com/headwindz/public-holidays/pulls).

## License

This project is open source and available under the MIT License.

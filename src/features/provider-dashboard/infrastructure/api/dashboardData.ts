export interface ChartDataItem {
    date: string;
    direct: number;
    referral: number;
}

export interface TimeframeData {
    label: string;
    data: ChartDataItem[];
}

export const timeframeDataMap: Record<string, TimeframeData> = {
    '7d': {
        label: 'for the last 7 days',
        data: [
            { date: 'Mon', direct: 120, referral: 80 },
            { date: 'Tue', direct: 150, referral: 95 },
            { date: 'Wed', direct: 110, referral: 70 },
            { date: 'Thu', direct: 180, referral: 110 },
            { date: 'Fri', direct: 210, referral: 130 },
            { date: 'Sat', direct: 240, referral: 150 },
            { date: 'Sun', direct: 190, referral: 120 },
        ]
    },
    '30d': {
        label: 'for the last 30 days',
        data: [
            { date: 'Jun 1', direct: 320, referral: 210 },
            { date: 'Jun 5', direct: 350, referral: 220 },
            { date: 'Jun 9', direct: 490, referral: 340 },
            { date: 'Jun 13', direct: 520, referral: 390 },
            { date: 'Jun 17', direct: 580, referral: 420 },
            { date: 'Jun 21', direct: 540, referral: 380 },
            { date: 'Jun 25', direct: 610, referral: 450 },
            { date: 'Jun 30', direct: 590, referral: 410 },
        ]
    },
    '90d': {
        label: 'for the last 3 months',
        data: [
            { date: 'Apr 1', direct: 1200, referral: 800 },
            { date: 'Apr 15', direct: 1450, referral: 920 },
            { date: 'May 1', direct: 1380, referral: 890 },
            { date: 'May 15', direct: 1620, referral: 1050 },
            { date: 'Jun 1', direct: 1750, referral: 1180 },
            { date: 'Jun 15', direct: 1980, referral: 1320 },
            { date: 'Jul 1', direct: 2200, referral: 1450 },
        ]
    }
};

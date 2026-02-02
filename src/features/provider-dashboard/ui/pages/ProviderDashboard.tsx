import { useState } from 'react';
import type { FC } from 'react';
import { StatsOverview } from '../components/StatsOverview';
import { RevenueGrowthChart } from '../components/RevenueGrowthChart';
import { TodayFlow } from '../components/TodayFlow';
import { UtilizationDonut } from '../components/UtilizationDonut';
import { FleetHealth } from '../components/FleetHealth';
import { QuickLogistics } from '../components/QuickLogistics';
import { timeframeDataMap } from '../../infrastructure/api/dashboardData';
import '../styles/ProviderDashboard.css';

export const ProviderDashboard: FC = () => {
    const [timeframe, setTimeframe] = useState('30d');
    const currentData = timeframeDataMap[timeframe];

    return (
        <div className="provider-dashboard">
            <StatsOverview />

            <div className="dashboard-main-grid">
                <div className="dashboard-column-main">
                    <RevenueGrowthChart
                        timeframe={timeframe}
                        setTimeframe={setTimeframe}
                        currentData={currentData}
                    />
                    <TodayFlow />
                </div>

                <div className="dashboard-column-side">
                    <UtilizationDonut />
                    <FleetHealth />
                    <QuickLogistics />
                </div>
            </div>
        </div>
    );
};

<?php

namespace App\Filament\Widgets;

use App\Models\Enquiry;
use App\Models\Product;
use App\Models\Category;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Products', Product::where('is_active', true)->count())
                ->description('Active in catalogue')
                ->color('primary')
                ->icon('heroicon-o-cube'),

            Stat::make('Categories', Category::where('is_active', true)->count())
                ->color('info')
                ->icon('heroicon-o-tag'),

            Stat::make('New Enquiries', Enquiry::where('status', 'new')->count())
                ->description('Awaiting response')
                ->color('warning')
                ->icon('heroicon-o-envelope'),

            Stat::make('Total Enquiries', Enquiry::count())
                ->description('All time')
                ->color('gray')
                ->icon('heroicon-o-inbox'),
        ];
    }
}

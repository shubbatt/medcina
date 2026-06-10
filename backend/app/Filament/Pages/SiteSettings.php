<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class SiteSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon  = 'heroicon-o-cog-6-tooth';
    protected static ?string $navigationLabel = 'Site Settings';
    protected static ?string $navigationGroup = 'Operations';
    protected static ?int    $navigationSort  = 10;
    protected static string  $view            = 'filament.pages.site-settings';

    public ?array $data = [];

    public function mount(): void
    {
        $all = array_merge(
            Setting::contact(),
            Setting::hero(),
            Setting::about(),
        );
        $this->form->fill($all);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([

                // ── Hero ───────────────────────────────────────────────────
                Section::make('Hero Section')
                    ->description('Controls the homepage hero image and headline text.')
                    ->icon('heroicon-o-home')
                    ->schema([
                        FileUpload::make('hero_image')
                            ->label('Hero Image')
                            ->image()
                            ->disk('public')
                            ->directory('hero')
                            ->maxSize(10240)
                            ->imageResizeMode('force')
                            ->imageResizeTargetWidth('1600')
                            ->imageResizeTargetHeight('900')
                            ->helperText('Max 10 MB. Will be resized to 1600×900 px automatically. Leave empty to show the animated visual.')
                            ->columnSpanFull(),

                        TextInput::make('hero_headline')
                            ->label('Headline')
                            ->placeholder('Advanced Medical Supplies & Wound Care Solutions')
                            ->columnSpanFull(),

                        Textarea::make('hero_subheadline')
                            ->label('Sub-headline')
                            ->rows(3)
                            ->columnSpanFull(),
                    ]),

                // ── About Page ─────────────────────────────────────────────
                Section::make('About Page')
                    ->description('Content for the About Us page.')
                    ->icon('heroicon-o-information-circle')
                    ->schema([
                        TextInput::make('about_headline')
                            ->label('Page Headline')
                            ->columnSpanFull(),

                        TextInput::make('about_subheadline')
                            ->label('Page Sub-headline')
                            ->columnSpanFull(),

                        FileUpload::make('about_company_image')
                            ->label('Company / Team Photo')
                            ->image()
                            ->disk('public')
                            ->directory('about')
                            ->maxSize(10240)
                            ->imageResizeMode('force')
                            ->imageResizeTargetWidth('800')
                            ->imageResizeTargetHeight('600')
                            ->helperText('Max 10 MB. Will be resized to 800×600 px automatically.')
                            ->columnSpanFull(),

                        Textarea::make('about_intro_1')
                            ->label('Introduction — Paragraph 1')
                            ->rows(4)
                            ->columnSpanFull(),

                        Textarea::make('about_intro_2')
                            ->label('Introduction — Paragraph 2')
                            ->rows(4)
                            ->columnSpanFull(),

                        Textarea::make('about_mission')
                            ->label('Mission Statement')
                            ->rows(3),

                        Textarea::make('about_vision')
                            ->label('Vision Statement')
                            ->rows(3),
                    ])->columns(2),

                // ── Contact ────────────────────────────────────────────────
                Section::make('Contact Information')
                    ->description('Displayed on the website footer and contact page.')
                    ->icon('heroicon-o-phone')
                    ->schema([
                        TextInput::make('contact_phone')
                            ->label('Phone Number')
                            ->tel()
                            ->placeholder('+960 XXX XXXX'),

                        TextInput::make('contact_email')
                            ->label('Email Address')
                            ->email()
                            ->placeholder('info@medcina.mv'),

                        TextInput::make('contact_whatsapp')
                            ->label('WhatsApp Number')
                            ->tel()
                            ->placeholder('+960 XXX XXXX')
                            ->helperText('Leave blank to hide the WhatsApp link.'),

                        Textarea::make('contact_address')
                            ->label('Office Address')
                            ->rows(3)
                            ->placeholder('Building name, Street, Malé, Maldives'),
                    ])->columns(2),

                // ── Opening Hours ──────────────────────────────────────────
                Section::make('Opening Hours')
                    ->icon('heroicon-o-clock')
                    ->schema([
                        Textarea::make('opening_hours')
                            ->label('Opening Hours')
                            ->rows(4)
                            ->helperText('One line per entry, e.g. "Sunday – Thursday: 8:00 AM – 5:00 PM"')
                            ->columnSpanFull(),
                    ]),

                // ── Brand ──────────────────────────────────────────────────
                Section::make('Brand')
                    ->icon('heroicon-o-building-office')
                    ->schema([
                        Textarea::make('company_tagline')
                            ->label('Footer Tagline')
                            ->rows(2)
                            ->helperText('Shown in the footer below the logo.')
                            ->columnSpanFull(),
                    ]),

            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $state = $this->form->getState();

        foreach ($state as $key => $value) {
            Setting::set($key, is_array($value) ? null : ($value ?: null));
        }

        Notification::make()
            ->title('Settings saved')
            ->success()
            ->send();
    }
}

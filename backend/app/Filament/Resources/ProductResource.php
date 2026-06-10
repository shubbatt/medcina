<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;
    protected static ?string $navigationIcon = 'heroicon-o-cube';
    protected static ?string $navigationGroup = 'Catalogue';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([

            Forms\Components\Section::make('Product Information')
                ->schema([
                    Forms\Components\TextInput::make('name')
                        ->required()
                        ->maxLength(255)
                        ->live(onBlur: true)
                        ->columnSpanFull(),

                    Forms\Components\Select::make('category_id')
                        ->relationship('category', 'name')
                        ->required()
                        ->searchable()
                        ->preload(),

                    Forms\Components\Select::make('availability_status')
                        ->options([
                            'available'    => 'Available',
                            'out_of_stock' => 'Out of Stock',
                            'discontinued' => 'Discontinued',
                        ])
                        ->required()
                        ->default('available'),

                    Forms\Components\Toggle::make('is_featured')
                        ->label('Featured on Homepage')
                        ->default(false),

                    Forms\Components\Toggle::make('is_active')
                        ->label('Active / Visible')
                        ->default(true),

                    Forms\Components\TextInput::make('sort_order')
                        ->numeric()
                        ->default(0),
                ])->columns(3),

            Forms\Components\Section::make('Descriptions')
                ->schema([
                    Forms\Components\Textarea::make('short_description')
                        ->required()
                        ->rows(3)
                        ->maxLength(500)
                        ->columnSpanFull(),

                    Forms\Components\RichEditor::make('full_description')
                        ->columnSpanFull()
                        ->toolbarButtons([
                            'bold', 'bulletList', 'h2', 'h3', 'italic',
                            'link', 'orderedList', 'redo', 'strike', 'undo',
                        ]),
                ]),

            Forms\Components\Section::make('Specifications')
                ->schema([
                    Forms\Components\Repeater::make('specifications')
                        ->schema([
                            Forms\Components\TextInput::make('label')
                                ->required()
                                ->placeholder('e.g. Dimensions'),
                            Forms\Components\TextInput::make('value')
                                ->required()
                                ->placeholder('e.g. 30cm x 20cm'),
                        ])
                        ->columns(2)
                        ->defaultItems(0)
                        ->addActionLabel('Add Specification')
                        ->columnSpanFull(),
                ]),

            Forms\Components\Section::make('Product Images')
                ->schema([
                    Forms\Components\SpatieMediaLibraryFileUpload::make('images')
                        ->collection('images')
                        ->multiple()
                        ->reorderable()
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                        ->maxSize(5120)
                        ->columnSpanFull(),
                ]),

            Forms\Components\Section::make('Brochure')
                ->schema([
                    Forms\Components\SpatieMediaLibraryFileUpload::make('brochure')
                        ->collection('brochure')
                        ->acceptedFileTypes(['application/pdf'])
                        ->maxSize(10240)
                        ->label('Product Brochure (PDF)'),
                ]),

            Forms\Components\Section::make('SEO')
                ->schema([
                    Forms\Components\TextInput::make('seo_title')
                        ->maxLength(70)
                        ->placeholder('Leave blank to use product name'),
                    Forms\Components\Textarea::make('seo_description')
                        ->rows(2)
                        ->maxLength(160)
                        ->placeholder('Leave blank to use short description'),
                ])->columns(1),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\SpatieMediaLibraryImageColumn::make('images')
                    ->collection('images')
                    ->size(48)
                    ->circular(false),

                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('category.name')
                    ->badge()
                    ->color('primary'),

                Tables\Columns\BadgeColumn::make('availability_status')
                    ->colors([
                        'success' => 'available',
                        'danger'  => 'out_of_stock',
                        'gray'    => 'discontinued',
                    ]),

                Tables\Columns\IconColumn::make('is_featured')
                    ->boolean()
                    ->label('Featured'),

                Tables\Columns\IconColumn::make('is_active')
                    ->boolean()
                    ->label('Active'),

                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->relationship('category', 'name'),
                Tables\Filters\SelectFilter::make('availability_status')
                    ->options([
                        'available'    => 'Available',
                        'out_of_stock' => 'Out of Stock',
                        'discontinued' => 'Discontinued',
                    ]),
                Tables\Filters\TernaryFilter::make('is_featured')->label('Featured'),
                Tables\Filters\TernaryFilter::make('is_active')->label('Active'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('sort_order');
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit'   => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}

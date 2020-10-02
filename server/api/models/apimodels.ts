/**
 * @ Author: Tim Koepsel
 * @ Create Time: 17.06.2020 13:14:53
 * @ Modified by: Tim Koepsel <tim.koepsel@picard.de>
 * @ Modified time: 18.09.2020 13:31:03
 */

export interface ApiProduct {
	ProductId: number,                      // Interne ProductId
	ProductName: string,                    // Produktbezeichnung zb. 6000-2RS
	ProductName2: string,                    // Produktbezeichnung zb. 6000-2RS
	CategoryId: number,                     // Category Id  (Modell: ApiCategory)
	CategoryIdEku: number,                     // Category Id  (Modell: ApiCategory)
	Ean: string[],
	ManufacturerId: number,                 // Hersteller Id (Modell: ApiManufacturer)
	ExternManufacturerId: number,           
	Attributes: Array<{
		LocalizationIso: string,        	// Iso Code Sprache zb. de-DE
		AttributeKey: {
			Id: number,
			Label: string
		},        							// Name einer Eigenschaft
		AttributeValue: {
			Id: number,
			Label: string
		},         							// Zugehörige Ausprägung
	}>,
	BuildProducts: string[],                // Bauähnliche Produkte Ids
	RelatedProducts: string[],              // Verwandte Produkte Ids
	SetProducts: string[],                  // Satz von Produkten Ids
	Dimension: {                            // Abmessungen
		Size: {
			InnerDiameter: number,          // Bohrungsdurchmesser in mm
			OuterDiameter: number,          // Außendurchmesser in mm
			Width: number                   // Breite in mm
		},
		Weight: 0                           // Gewicht in gramm
	},
	Images: {
		Ekugellager: {
			FrontImage: string,
			BackImage: string,
			AllroundImage: string
		},
		Picard: {
			FrontImage: string,
			BackImage: string,
			AllroundImage: string,
			SketchImage: string
		}
	}
	SearchTags1: string,                    // Suchtags 1
	SearchTags2: string,                    // Suchtags 2
	SearchTags3: string,                    // Suchtags 3
	CreatedAt: string,                      // Erstellungsdatum als Iso String
	ModifiedAt: string,                     // Modifizierungsdatum als Iso String
	DeletedAt: string                       // Löschdatum als Iso String
}


export interface ApiCategory {
	CategoryId: number,                     // Category Id
	CategoryParentId: number,               // Parent Category Id
	Translations: Array<{
		LocalizationIso: string             // Sprache Isocode
		CategoryName: string                // Überzetzung
	}>,
	CreatedAt: string,                      // Erstellungsdatum als Iso String
	ModifiedAt: string,                     // Modifizierungsdatum als Iso String
	DeletedAt: string                       // Löschdatum als Iso String
}

export interface ApiProductQuantity {
    ProductId: number,                      // Interne ProductId
	Quantity: number,                		// Vorrat
	CreatedAt: string,                      // Erstellungsdatum als Iso String
	ModifiedAt: string,                     // Modifizierungsdatum als Iso String
	DeletedAt: string                       // Löschdatum als Iso String
}

export interface ApiManufacturer {
	ManufacterId: number,                 	// Hersteller Id
	FullName: string,                       // Herstellername ausgeschrieben
	ShortName: string,                      // Herstellername Kurzform
	CreatedAt: string,                      // Erstellungsdatum als Iso String
	ModifiedAt: string,                     // Modifizierungsdatum als Iso String
	DeletedAt: string                       // Löschdatum als Iso String
}

export interface ApiLocalization {
	LocalizationId: number,                 // Sprache Id
	LocalizationIso: string,                // Sprache Isocode
	CreatedAt: string,                      // Erstellungsdatum als Iso String
	ModifiedAt: string,                     // Modifizierungsdatum als Iso String
	DeletedAt: string                       // Löschdatum als Iso String
}

export interface ApiProductPrice {
	ProductId: number,                      // Zugehörige Produkt Id
	PriceProfile: number,                   // Zugehöriges Preisprofile
	Currency: string                        // Wird immer EUR sein
	ProductPrice: number,                   // Produkt Preis in EUR
	ListPrice: number,                      // offizieller Listenpreis
	FictiveListPrice: number,               // falls nicht offizieller Listenpreis
	OccasionPrice: number,                  // Kunden Occasionspreis
	SelectionPrice: number,                 // Kunden Selectionpreis
	CreatedAt: string,                      // Erstellungsdatum als Iso String
	ModifiedAt: string,                     // Modifizierungsdatum als Iso String
	DeletedAt: string                       // Löschdatum als Iso String
}

export interface ApiPdoSettings {
	CustomerId: number,                     // Kundennummer
	CustomerName: string,                   // Kundenname
	CustomerKey: string,                    // Kunden Api Key
	PriceProfile: number,                   // Preisprofile
	IsSelection: boolean,                   // Wenn Kunde hat Selection preisen
	IsOccasion: boolean,                    // Wenn Kunde hat Occasion preisen
	IsActive: boolean,						// Ist diese Setting aktiv
	Localization: string[],                 // [de-DE, en-EN] Veit sprechen
	CreatedAt: string,                      // Erstellungsdatum als Iso String
	ModifiedAt: string,                     // Modifizierungsdatum als Iso String
	DeletedAt: string                       // Löschdatum als Iso String
}

export interface ApiEkuPrice {
	ProductId: number,                      // Produkt Id
	Range: Array<{
		FromQty: number,                	// Preise von
		ToQty: number,                  	// Preise bis
		Price: string                   	// Preise
	}>,
	CreatedAt: string,                      // Erstellungsdatum als Iso String
	ModifiedAt: string,                     // Modifizierungsdatum als Iso String
	DeletedAt: string                       // Löschdatum als Iso String
}

export interface ApiUploadedFile {
	Id: number,
	UploadedAt: string,
	OriginalFilename: string,
	EncodingInfo: string,
	MimeType: string,
	Size: string,
	StorageDestination: string,
	Filename: string,
	Path: string,
	Type?: "LIEFERSCHEIN" | "MEDIA" | "DOKUMENT" | "IMAGE" | "VIDEO", "ANY"
}

export interface ApiOrder {
	Id: number,
	InvoiceNumber: string,
	InvoiceDate: string,
	AddressDelivery: Array<{CustomerId: number, Country: string, State: string, Street: string, City: string, ZipCode: string, Company: string, Lastname: string, Firstname: string, Phone: number, Deleted: boolean}>
}

export interface ApiLineartechProduct {
	ProductId: number,
	Type: number,
	Length: number,
	MinLengthLeft: number,
	MaxLengthLeft: number,
	LengthToHole: number,
	Height: number,
	Width: number,
	HoleDiameter: number,
	Thread: number,
	NumberHoles: number,
	Sketch: string,
	SchemaFilter: string,
	Weight: number,
	Details: {
		LengthOriginal: number,
		LengthInStock: number,
		LengthLeft: number,
		LengthRight: number,
		CreatedAt: string,
		ModifiedAt: string,
		DeletedAt: string,
	},
	CreatedAt: string,
	ModifiedAt: string,
	DeletedAt: string,
}

export interface ApiOrderElement_ {
	product_id: number,
	product_reference: string,
	product_quantity: number,
	price: string,
	product_supplier_reference: string,
	line_refence_text: string,
	linear_length: string,
	linear_distance_first_bore: string,
	linear_symmetrical: number
}

export interface ApiOrderElement {
	ProductId: number,
	ProductReference: string,
	ProductQuantity: number,
	Price: string,
	ProductSupplierReference: string,
	LineReferenceText: string,
	LinearLength: string,
	LinearDistanceFirstBore: string,
	LinearSymmetrical: number
}
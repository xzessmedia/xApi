/**
 * @ Author: Tim Koepsel
 * @ Create Time: 12.06.2020 10:57:04
 * @ Modified by: Tim Koepsel <tim.koepsel@picard.de>
 * @ Modified time: 22.09.2020 10:16:54
 * @ Description:
 */


 export interface Brand {
     BrandID: number,
     BrandName: string,
     ShowName: string,
     Created?: Date,
     Modified?: Date,
     Deleted?: Date
 }

 export interface CatalogCategory {
     CategoryID: number,
     ParentCategoryID?: number,
     Sort: number,
     FilterOptions?: string,
     IsLinear?: boolean,
     Created?: Date,
     Modified?: Date,
     Deleted?: Date
 }

 export interface CatalogCategoryTranslation {
    CategoryId: number,
    LocalizationId: number,
    CategoryShortname?: string,
    CategoryLongname?: string
    Created?: Date,
    Modified?: Date,
    Deleted?: Date
 }

 export interface Product {
     ProductID: number,
     BulkProductID?: number,
     ProductName: string,
     ProductSku: string,
     BrandID: number,
     SchemaSketch?: string|null,
     ProceedGroup: number,
     ProductPrice: number,
     ProductListPrice: number,
     ProductOccPrice: number,
     ProductFictitiousListPrice: number,
     NoMaxSale: number,
     NoChargeProduct: number,
     Searchtext1?: string,
     SearchText2?: string,
     SearchText3?: string,
     Productfixedprice: number,
     Productweight: number,
     Productpacking: number,
     OnPallet: boolean
     ProductEan?: string,
     ProductEanAdditional? : string|null,
     SortSku?: string,
     SchemaFilter?: string|null,
     Created?: Date,
     Modified?: Date,
     Deleted?: Date
 }

 export interface ProductQuantity {
    ProductID: number,
    ProductQty?: number,
    Created?: Date,
    Modified?: Date,
    Deleted?: Date
 }

 
 /**
  * A Request coming from PDO Portal to Picard API
  * Transferred Order Object -> Picard Informix Database
  *
  * @export
  * @interface PdoOrder
  */
 export interface PdoOrder {
     
  OrderId: number,
  InvoiceNumber: number,
  InvoiceDate: string,
  PicardCustomerId: number
  ShopCustomerId: number,
  ShopLoginId: number,
  ShopLoginEmail: string,
  AddressDelivery: {
    Country: string,
    State: string,
    City: string,
    Postcode: string,
    Street: string,
    Company: string,
    Firstname: string,
    Lastname: string,
    Phone: string
  },
  AddressInvoice: {
    Country: string,
    State: string,
    City: string,
    Postcode: string,
    Street: string,
    Company: string,
    Firstname: string,
    Lastname: string,
    Phone: string
  },
  Currency: string,
  Language: string,
  VatNumber: string,
  CarrierId: string,
  IsPDFDelivered: true,
  DeliveryNote: string,
  IsPaid: true,
  PaymentMethod: string,
  TotalPaid: string,
  TotalShipping: string,
  OrderRows: [
    {
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
  ]
 }

 export interface PdoOrderExport extends PdoOrder {
    
 }

 export interface PdoOrder_ {
     orderId: number,
     picardCustomerId: number,
     shopCustomerId: number,
     shopLoginId: number,
     shopLoginEmail: string,
     addressDelivery: {
         country: string,
         state: string,
         city: string,
         postcode: string,
         street: string,
         company: string,
         firstname: string,
         lastname:string,
         phone:string
        },
    addressInvoice: {
        country: string,
        state: string,
        city: string,
        postcode: string,
        street: string,
        company: string,
        firstname: string,
        lastname: string,
        phone: string
    },
    currency: string,
    language: string,
    vat_number: string,
    carrier_id: string,
    state_pdf_delivery: boolean,
    delivery_note_name: string,
    state_is_paid: boolean,
    payment_method: string,
    total_paid: string,
    total_shipping: string,
    order_row: Array<{
        product_id: number,
        product_reference: string,
        product_quantity: number,
        price: string,
        product_supplier_reference: string,
        line_refence_text: string,
        linear_length: string,
        linear_distance_first_bore: string,
        linear_symmetrical: number}>
}

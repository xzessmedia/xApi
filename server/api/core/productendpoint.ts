/**
 * @ Author: Vadym Melnyk
 * @ Create Time: 22.06.2020 14:44:15
 * @ Modified by: Tim Koepsel <tim.koepsel@picard.de>
 * @ Modified time: 14.09.2020 17:26:47
 * @ Description:
 */

import { Request, Response, application } from "express";
import { RouteEndpoint } from "./endpoint";
import { reject } from "async";
import { resolve } from "bluebird";
import * as config from '../cfg/config.json';
import ServiceLog from "../services/service-log";
import { ApiProduct } from "../models/apimodels";

export default class ProductEndpoint extends RouteEndpoint
{
    OnInit() {}
    
    async HandleRequest(route: string, query: string, req: Request): Promise<any[] | null> {

        return new Promise(async (resolve, reject) => {
            try {
                let result = [];
                ServiceLog.LogApiRequest(route, req);
                let _result = await this.GetConnection().Query(`
                    ${query}
                `);
                let data = _result.results;
                
                if (data !== undefined) {
                    data.forEach((element) => {

                        // Process Attributes
                        let t_attributes: Array<{
                            LocalizationIso: string,        	// Iso Code Sprache zb. de-DE
                            AttributeKey: {
                                Id: number,
                                Label: string
                            },        	// Name einer Eigenschaft
                            AttributeValue: {
                                Id: number,
                                Label: string
                            },         	// Name einer Ausprägung
                            }> = [];                            // Processed Result Container

                        let t_attrib: Array<{
                            localizationiso: string, 
                            attributeparent: {
                                Id: number,
                                Label: string
                            }, 
                            attributevalue: {
                                Id: number,
                                Label: string
                            }
                            }> = JSON.parse(element.Attributes);

                        t_attrib.forEach(attribute => {
                            t_attributes.push({
                                LocalizationIso: attribute.localizationiso,
                                AttributeKey: attribute.attributeparent,
                                AttributeValue: attribute.attributevalue
                            });
                        });

                        // Process EAN's
                        let t_eans = [];
                        if (element.Ean1 !== "") {
                            t_eans.push(element.Ean1);
                        }
                        if (element.Ean2 !== "") {
                            t_eans.push(element.Ean2);
                        }

                        let item: ApiProduct  = {
                            ProductId: element.ProductId,
                            ProductName: element.ProductName,
                            ProductName2: element.ProductName2,
                            CategoryId: element.CategoryId,
                            CategoryIdEku: element.CategoryIdEku,
                            Ean: t_eans,
                            ManufacturerId: element.ManufacturerId,
                            ExternManufacturerId: element.ExternManufacturerId,
                            Attributes: t_attributes,
                            BuildProducts: element.BuildProducts,
                            RelatedProducts: element.RelatedProducts,
                            SetProducts: element.SetProducts,
                            Dimension: {
                                Size: {
                                    InnerDiameter: element.InnerDiameter,           // Innendurchmesser
                                    OuterDiameter: element.OuterDiameter,           // Außendurchmesser
                                    Width: element.Width                            // Breite
                                },
                                Weight: element.Weight,
                            },
                            Images: {
                                Ekugellager: {
                                    FrontImage: element.FrontImageEku,
                                    BackImage: element.BackImageEku,
                                    AllroundImage: element.AllroundImageEku
                                },
                                Picard: {
                                    FrontImage: element.FrontImagePicard,
                                    BackImage: element.BackImagePicard,
                                    AllroundImage: element.AllroundImagePicard,
                                    SketchImage: element.ZeichnungPicard
                                }
                            },
                            SearchTags1: element.SearchText1,
                            SearchTags2: element.SearchText2,
                            SearchTags3: element.SearchText3,
                            CreatedAt: element.CreatedAt,
                            ModifiedAt: element.ModifiedAt,
                            DeletedAt: element.DeletedAt
                        }

                        result.push(item);
                    });

                    resolve(result);
                }

            } catch (error) {
                reject(error);
            }
        });
    }
}
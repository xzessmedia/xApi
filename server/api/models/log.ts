/**
 * @ Author: Tim Koepsel
 * @ Create Time: 22.06.2020 06:30:30
 * @ Modified by: Tim Koepsel
 * @ Modified time: 22.06.2020 07:05:08
 * @ Description:
 */

export interface Log {
    Id: number,
    CreatedAt: string,
    Category: string,
    Message: string
}

export interface ApiRequestLog {
    Id: number,
    RequestedAt: string,
    AccessedRoute: string,
    User: string,
    RemoteIP: string,
    Token: string,
    Payload: string,
    ResponseTime: number
}
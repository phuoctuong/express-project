// @flow

import type { $Request, $Response, NextFunction } from 'express';

declare type ErrorType = Error & {
    status?: number
};

declare type Request = $Request;
declare type Response = $Response;
declare type Next = NextFunction;

declare type ProviderType =
    | 'facebook'
    | 'google'
    | 'twitter'

declare type SocketPayloadType = {
    tpye?: string,
    payload?: Object
};
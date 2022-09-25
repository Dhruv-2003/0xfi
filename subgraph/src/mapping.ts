import { BigInt } from "@graphprotocol/graph-ts";
import {
  paymentRequests,
  OwnershipTransferred,
  RequestPaidFull,
  RequestsCreated,
  userPaid,
} from "../generated/paymentRequests/paymentRequests";
import { RequestEntity } from "../generated/schema";

export function handleRequestPaidFull(event: RequestPaidFull): void {}

export function handleRequestsCreated(event: RequestsCreated): void {}

export function handleuserPaid(event: userPaid): void {}

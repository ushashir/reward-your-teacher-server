import { HydratedDocument } from 'mongoose';
import { Transfer } from '../schemas/transfer.schema';

export type TransferDocument = HydratedDocument<Transfer>;

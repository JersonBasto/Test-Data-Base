
import { DocumentTypeModel } from '../../models';

export class DocumentTypeEntity implements DocumentTypeModel {
    id = (Math.random() * (100 - 1 + 1) + 1).toString();
    name: string;
    state = true;
}
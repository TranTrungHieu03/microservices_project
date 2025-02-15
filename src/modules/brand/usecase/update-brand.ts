import {ICommandHandler} from "../../../share/interface";
import {IBrandRepository, UpdateCommand} from "../interface";
import {BrandUpdateDTOSchema} from "../model/dto";
import {ModelStatus} from "../../../share/model/base-model";
import {ErrDataNotFound} from "../../../share/model/base-error";
import {ErrBrandNameDuplicate} from "../model/error";

export class UpdateBrandCmdHandler implements ICommandHandler<UpdateCommand, void> {
    constructor(private readonly repository: IBrandRepository) {
    }
    
    async execute(command: UpdateCommand): Promise<void> {
        const {success, data: parsedData, error} = BrandUpdateDTOSchema.safeParse(command.data);
        if (!success) {
            throw new Error(JSON.stringify(error));
        }
        
        
        const brand = await this.repository.get(command.id);
        if (!brand || brand.status === ModelStatus.DELETED) {
            throw ErrDataNotFound;
        }
        
        
        await this.repository.update(command.id, parsedData);
        return
    }
}

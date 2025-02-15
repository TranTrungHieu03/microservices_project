import {BrandCreateDTOSchema} from "../model/dto";
import {ErrAlreadyExistBrand} from "../model/error";
import {v7} from "uuid";
import {ModelStatus} from "../../../share/model/base-model";
import {Brand} from "../model/brand";
import {CreateCommand, IBrandRepository} from "../interface";
import {ICommandHandler} from "../../../share/interface";

export class CreateNewBrandCmdHandler implements ICommandHandler<CreateCommand, string> {
    constructor(private readonly repository: IBrandRepository) {
    
    }
    
    async execute(command: CreateCommand
    ): Promise<string> {
        const {success, data: parsedData, error} = BrandCreateDTOSchema.safeParse(command.data);
        if (!success) {
            throw new Error(JSON.stringify(error));
        }
        
        const existedBrand = await this.repository.findByCond({name: parsedData.name});
        if (existedBrand) {
            throw ErrAlreadyExistBrand;
        }
        const newBrand: Brand = {
            ...parsedData,
            id: v7(),
            status: ModelStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        
        await this.repository.insert(newBrand);
        return newBrand.id;
    }
    
}
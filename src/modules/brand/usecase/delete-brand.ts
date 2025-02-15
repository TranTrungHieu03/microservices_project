import {ICommandHandler} from "../../../share/interface";
import {DeleteCommand, IBrandRepository} from "../interface";
import {ModelStatus} from "../../../share/model/base-model";
import {ErrDataNotFound} from "../../../share/model/base-error";

export class DeleteBrandCmdHandler implements ICommandHandler<DeleteCommand, void> {
    constructor(private readonly repository: IBrandRepository) {
    }
    
    async execute(command: DeleteCommand): Promise<void> {
        const brand = await this.repository.get(command.id);
        if (!brand || brand.status === ModelStatus.DELETED) {
            throw ErrDataNotFound;
        }
        await this.repository.delete(command.id, command.isHard)
        return
    }
}
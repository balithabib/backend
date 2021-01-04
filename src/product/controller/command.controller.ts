import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandService } from '../service/command.service';

@Controller('command')
export class CommandController {

  constructor(private readonly commandService: CommandService) {
  }

  @Post()
  async setCommand(@Body() command: any): Promise<any> {
    return await this.commandService.create(command);
  }

  @Get()
  async getCommand(): Promise<any> {
    return await this.commandService.all();
  }

  @Post('finished')
  async isFinished(@Body() command: any): Promise<any> {
    return await this.commandService.update(command);
  }

  @Post('/user')
  async getStatus(@Body() user: any): Promise<any> {
    return await this.commandService.findByUser(user.number);
  }

  @Post('/delete')
  async delete(@Body() product: any): Promise<any> {
    await this.commandService.delete(product);
  }
}

import { Controller, Get, Param } from '@nestjs/common'
import { AppService } from './app.service'

@Controller('api')
export class AppController {
  constructor (private readonly appService: AppService) { }

  @Get(':name')
  getHello (@Param() params): string {
    const { name } = params
    return this.appService.getHello(name)
  }
}

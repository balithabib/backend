import { Controller, Get, Param } from '@nestjs/common';
import { RecommendationService } from '../service/recommendation.service';

@Controller('recommendation')
export class RecommendationController {

  constructor(private readonly recommendationService: RecommendationService) {
  }

  @Get('set/:id')
  async set(@Param('id') id: number): Promise<any> {
    return await this.recommendationService.set(id);
  }

  @Get('get/:id')
  async get(@Param('id') id: number): Promise<any> {
    return await this.recommendationService.findById(id);
  }

  @Get('love_add/:id')
  async addLove(@Param('id') id: number): Promise<any> {
    return await this.recommendationService.addLove(id);
  }

  @Get('love_sub/:id')
  async subLove(@Param('id') id: number): Promise<any> {
    return await this.recommendationService.subLove(id);
  }

  @Get('bad_add/:id')
  async addBad(@Param('id') id: number): Promise<any> {
    return await this.recommendationService.addBad(id);
  }

  @Get('bad_sub/:id')
  async subBad(@Param('id') id: number): Promise<any> {
    return await this.recommendationService.subBad(id);
  }

  @Get('buy_add/:id')
  async addBuy(@Param('id') id: number): Promise<any> {
    return await this.recommendationService.addBuy(id);
  }

  @Get('buy_sub/:id')
  async subBuy(@Param('id') id: number): Promise<any> {
    return await this.recommendationService.subBuy(id);
  }
}

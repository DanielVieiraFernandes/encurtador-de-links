import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { LinkService } from '../link/link.service';
import { CreateShortLink } from '../link/dto/create-short-link.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ClientIp } from 'src/infra/auth/client-ip';

@Controller()
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post('/links')
  @ApiResponse({
    status: 201,
    example: {
      shortUrl: 'shortUrl.example.com',
    },
  })
  async createShortLink(@Body() createShortUrl: CreateShortLink) {
    const result = await this.linkService.createShortLink(
      createShortUrl.originalLink,
    );

    const { shortUrl } = result;

    return {
      shortUrl,
    };
  }

  @Get(':code')
  async findByCode(
    @Param('code') code: string,
    @Res() res: Response,
    @ClientIp() ip: string,
  ) {
    const originalUrl = await this.linkService.findByCode(code, ip);

    return res.redirect(originalUrl);
  }

  @Get(':code/counts')
  @ApiResponse({
    status: 200,
    example: {
      counts: 12,
    },
  })
  async returnCounts(@Param('code') code: string, @ClientIp() ip: string) {
    const counts = await this.linkService.returnCounts(code, ip);

    return {
      counts,
    };
  }
}

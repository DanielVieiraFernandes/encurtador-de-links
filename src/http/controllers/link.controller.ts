import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { LinkService } from '../link/link.service';
import { CreateShortLink } from '../link/dto/create-short-link.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

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
  async findByCode(@Param('code') code: string, @Res() res: Response) {
    const originalUrl = await this.linkService.findByCode(code);

    return res.redirect(originalUrl);
  }
}

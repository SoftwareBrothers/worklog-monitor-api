import { BadRequestException, Injectable } from '@nestjs/common';
import { WebAPICallResult, WebClient } from '@slack/web-api';
import { ConfigService } from 'nestjs-config';

@Injectable()
export class SlackService {
  private readonly webClient: WebClient;

  private readonly channel: string;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.webClient = new WebClient(configService.get('slack.apiToken'));
    this.channel = configService.get('slack.channel');
  }

  public async sendToChannel(message: string, channel = null): Promise<WebAPICallResult> {
    try {
      return this.webClient.chat.postMessage({
        channel: channel || this.channel,
        text: message,
      });
    } catch (e) {
      throw new BadRequestException(`Unable to post a message to channel ${channel}`);
    }
  }

  public async sendToUser(message: string, email: string): Promise<WebAPICallResult> {
    let user;
    try {
      const userResponse = await this.webClient.users.lookupByEmail({
        email,
      });
      user = userResponse.user;
    } catch (e) {
      throw new BadRequestException(`Unable to lookup user by email '${email}'`);
    }

    try {
      return await this.webClient.chat.postMessage({
        channel: user.id,
        text: message,
      });
    } catch (e) {
      throw new BadRequestException(`Unable to post a message to ${email}`);
    }
  }
}

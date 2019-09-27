import { BadRequestException, Injectable } from '@nestjs/common';
import { WebAPICallResult, WebClient } from '@slack/web-api';

@Injectable()
export class SlackService {
  private readonly webClient: WebClient;

  private readonly channel: string;

  constructor() {
    this.webClient = new WebClient(process.env.SLACK_API_TOKEN);
    this.channel = process.env.SLACK_NOTIFICATIONS_CHANNEL;
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

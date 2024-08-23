import dotenv from "dotenv";
dotenv.config();
import Redis, { Callback } from "ioredis";

export class RedisManager {
  private static _instance: RedisManager;
  private subscribe_client: Redis;
  private publish_client: Redis;
  private constructor() {
    this.subscribe_client = new Redis({
      host: process.env.REDIS_HOST as string,
      port: process.env.REDIS_PORT as unknown as number,
      password: process.env.REDIS_PWD as string,
      username: process.env.REDIS_USER as string,
      tls: {},
    });
    this.publish_client = new Redis({
      host: process.env.REDIS_HOST as string,
      port: process.env.REDIS_PORT as unknown as number,
      password: process.env.REDIS_PWD as string,
      username: process.env.REDIS_USER as string,
      tls: {},
    });
  }

  public static getInstance(): RedisManager {
    if (this._instance == null) {
      return new RedisManager();
    }
    return this._instance;
  }

  public getPublisher() {
    return this.publish_client;
  }

  public getSubscriber() {
    return this.subscribe_client;
  }

  public subscribe(channel: string, callback: (message: string) => void) {
    this.subscribe_client.subscribe(channel, (err, count) => {
      if (err) {
        console.log("Error while subscribing to " + channel);
      } else {
        console.log("Subscribed to channel");
      }
    });

    this.subscribe_client.on(
      "message",
      (subscribedChannel: string, message: string) => {
        console.log(
          "Subscriber ",
          subscribedChannel,
          " has received msg ",
          message
        );
        if (subscribedChannel === channel) {
          callback(message);
        }
      }
    );
  }

  public unSubscribe(channel: string){
    this.subscribe_client.unsubscribe(channel,(err) => {
        if (err) {
            console.log("Unable to un-subscribe " + channel);
        }
        console.log("Un-subscribed from the channle " + channel)
    });
  }

  public async publish(channel:string,message:string){
    try{
        await this.getPublisher().publish(channel,message);
        console.log("Message published to channel " + channel + "message " + message);
    }catch(e){
        console.log("Error while publishing message to channel " + channel + "message" + message);
    }
  }
}

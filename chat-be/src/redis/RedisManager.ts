import dotenv from "dotenv";
dotenv.config();
import Redis from "ioredis";

class RedisManager {
  private static _instance: RedisManager;
  private subscribe_client: Redis;
  private publish_client: Redis;
  private constructor() {
    this.subscribe_client = new Redis();
    this.publish_client = new Redis();
  }

  public check(){
    if(this.publish_client === undefined){
      console.log('Connection not happened');
    }else{
      console.log('Connection happened');
    }
  }

  public static getInstance(): RedisManager {
    if (this._instance == null) {
      return new RedisManager();
    }
    return this._instance;
  }

  public getPublisher() {
    if(this.publish_client){
      return this.publish_client;
    }
    console.log("No Publisher Client Found");
  }

  public getSubscriber() {
    if(this.subscribe_client){
      return this.subscribe_client;
    }
    console.log("No Subscriber");
  }

  public subscribe(channel: string, callback: (message: string) => void) {
    this.subscribe_client.subscribe(channel, (err) => {
      if (err) {
        console.log("Error while subscribing to " + channel);
        return;
      }
      console.log("Subscribed to channel " + channel);
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

  public async publish(channel: string, message: string) {
    try {
      const publisher = this.getPublisher();
      if (publisher !== undefined) {
        await publisher.publish(channel, message);
        console.log("Message published to channel " + channel + " message " + message);
      } else {
        console.log("Publisher is not defined, cannot publish message to channel " + channel);
      }
    } catch (e) {
      console.log("Error while publishing message to channel " + channel + " message " + message);
    }
  }
}

export default RedisManager;

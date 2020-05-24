import INotificationsRepository from "../INotificationsRepository";
import INotificationDTO from "@modules/notifications/dtos/INotificationDTO";
import Notification from '../../infra/typeorm/schemas/Notification';
import { ObjectID } from 'mongodb';

export default class FakeNotificationsRepository implements INotificationsRepository {

  private notifications: Notification[] = [];

  public async create({content, recipient_id}: INotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, {
      id: new ObjectID(),
      content,
      recipient_id
    })

    this.notifications.push(notification);

    return notification;
  }

}

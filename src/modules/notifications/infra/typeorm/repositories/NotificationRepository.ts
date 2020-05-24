import INotificationDTO from '../../../dtos/INotificationDTO';
import INotificationRepository from '../../../repositories/INotificationsRepository';
import Notification from '../schemas/Notification';
import { MongoRepository, getMongoRepository } from 'typeorm';

export default class NotificationRepository implements INotificationRepository {

  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({content, recipient_id}: INotificationDTO): Promise<Notification> {

    const notification = this.ormRepository.create({
      content,
      recipient_id
    });

    await this.ormRepository.save(notification);

    return notification;
  }

}

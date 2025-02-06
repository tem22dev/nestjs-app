import { Controller, Get } from '@nestjs/common';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { MailerService } from '@nestjs-modules/mailer';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Job, JobDocument } from 'src/jobs/schemas/job.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SubscriberDocument } from 'src/subscribers/schemas/subscriber.schema';
import { Subscriber } from 'rxjs';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('mail')
export class MailController {
    constructor(
        private readonly mailerService: MailerService,

        @InjectModel(Job.name) private jobModel: SoftDeleteModel<JobDocument>,
        @InjectModel(Subscriber.name) private subscriberModel: SoftDeleteModel<SubscriberDocument>,
    ) {}

    @Get()
    @Public()
    @ResponseMessage('Test email')
    @Cron('* 0 0 * * 0') // Chủ nhật hàng tuần 00:00:00
    async handleTestEmail() {
        const subscribers = await this.subscriberModel.find({});
        for (const subs of subscribers) {
            const subsSkills = subs.skills;
            const jobWithMatchingSkills = await this.jobModel.find({ skills: { $in: subsSkills } });

            if (jobWithMatchingSkills?.length) {
                const jobs = jobWithMatchingSkills.map((item) => {
                    return {
                        name: item.name,
                        company: item.company.name,
                        salary: `${item.salary}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ',
                        skills: item.skills,
                    };
                });
                await this.mailerService.sendMail({
                    to: 'em21072006015@vnkgu.edu.vn',
                    from: '"Support Team" <support@example.com>', // override default from
                    subject: 'Welcome to Nice App! Confirm your Email',
                    template: 'mail',
                    context: {
                        receiver: subs.name,
                        jobs: jobs,
                    },
                });
            }
        }
    }
}

import {Component} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    public assigneeData: {} = {};
    public assigneeDrillDownData: any = [];
    public labelData: {} = {};
    public constructor(private dataService: DataService) {
        this.assigneeData = dataService.getCountBy('assignee');
        this.assigneeDrillDownData = dataService.getDrillDownData('assignee', 'labels');

        this.labelData = dataService.getCountBy('labels');
    }
}

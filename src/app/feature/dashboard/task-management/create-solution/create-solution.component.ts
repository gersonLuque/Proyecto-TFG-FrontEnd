import {Component, input, OnDestroy, OnInit} from '@angular/core';
import {TaskDto} from '@core/dto/taskDto';
import {TaskService} from '@core/services/task.service';
import {lastValueFrom, Observable, Subscription} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {FileListComponent} from '../../../../shared/components/file-list/file-list.component';
import {AppUploadFilesComponent} from '../../../../shared/components/app-upload-files/app-upload-files.component';
import { FormsModule} from '@angular/forms';
import {SolutionService} from '@core/services/solution.service';
import {ToastService} from '@core/services/toast.service';
import {SolutionDto} from '@core/dto/solutionDto';
import {Panel} from 'primeng/panel';


@Component({
  selector: 'app-create-solution',
  imports: [
    AsyncPipe,
    FileListComponent,
    AppUploadFilesComponent,
    FormsModule,
    Panel
  ],
  templateUrl: './create-solution.component.html',
  styleUrl: './create-solution.component.css'
})
export default class CreateSolutionComponent implements OnInit , OnDestroy {

  taskId = input.required<number>()
  id = input.required<number>() // courseId
  task$: Observable<TaskDto>;
  solution$: Observable<SolutionDto>;
  solution: SolutionDto;
  uploadedFiles: any[] = [];
  isChecked: boolean = false;
  protected isFilesReset: boolean = false;
  protected filesHasChanged:boolean
  private solutionSub: Subscription;

  constructor(private taskService: TaskService, private solutionService: SolutionService, private toastService: ToastService) {

  }

  async sendData() {
    if (this.solution?.fileSolutions.length === 0 && this.uploadedFiles.length > 0) {
      this.filesHasChanged = true
    }


    if (this.solution !== undefined){
      try {
        await lastValueFrom(this.solutionService.updateSolution(this.formUpdate()))
        this.toastService.showSuccess('Solución actualizada con éxito')
        this.solution = await lastValueFrom(this.solutionService.getSolutionByTaskAndUser(this.taskId(),1))
        this.isFilesReset = false
        this.filesHasChanged = false
      }catch (error){
        this.toastService.showError('Error al actualizar la solución')
      }
    }else {
      try {
        await lastValueFrom(this.solutionService.createSolution(this.formCreate()))
        this.toastService.showSuccess(`Solución creada con éxito`)
        this.solution = await lastValueFrom(this.solutionService.getSolutionByTaskAndUser(this.taskId(),1))
        this.isFilesReset = false
        this.filesHasChanged = false
      } catch (error) {
        this.toastService.showError(`Error al crear la solución`)
      }
    }

  }

  formCreate(): FormData {
    const solutionData = new FormData();
    solutionData.append('taskId', this.taskId().toString())
    solutionData.append('userId', String(1)) // todo cambiar por el usuario autenticado
    solutionData.append('anonymous', String(this.isChecked))

    if (this.uploadedFiles.length > 0) {
      solutionData.append('filesHasChanged', "true")
      this.uploadedFiles.forEach(file => {
        solutionData.append('files', file);
      })
    }
    return solutionData
  }

  formUpdate(): FormData {
    const solutionData = new FormData();

    solutionData.append('solutionId', this.solution?.solutionId.toString())
    solutionData.append('anonymous', String(this.isChecked))
    if (this.filesHasChanged === true) {
      solutionData.append('filesHasChanged', "true")
      this.uploadedFiles.forEach(file => {
        solutionData.append('files', file);
      })
    }
    return solutionData
  }

  ngOnInit() {
    this.task$ = this.taskService.getTaskById(this.taskId());
    //todo cambiar hardcode por usuario autenticado
    this.solutionSub = this.solutionService.getSolutionByTaskAndUser(this.taskId(), 1).subscribe(
      solution => {
        if (solution){
          this.solution = solution
          this.isChecked = solution?.anonymous
          console.log(solution?.anonymous)
        }
      }
    )
  }

  ngOnDestroy() {
    this.solutionSub.unsubscribe()
  }

  handleUploadedFiles(files: any[]) {
    this.uploadedFiles = files
  }

  resetFiles() {
    this.isFilesReset = true;
    this.filesHasChanged = true;
    this.uploadedFiles = []
  }

}

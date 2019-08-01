import { HostListener, EventEmitter, Input, Output } from '@angular/core';
import { Directive } from '@angular/core';
// import * as $ from 'jquery';
declare const $: any;

@Directive({
    selector: '[appConfirmButton]'
})
export class ConfirmButtonDirective {

    @Input() confirmTitle: String = 'Confirm';
    @Input() confirmText: String = 'Are you sure you want to delete this item?';
    @Input() confirmCancel: String = 'No';
    @Input() confirmOk: String = 'Yes';

    @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

    @HostListener('click') onMouseEnter() {
        const confirmed: EventEmitter<boolean> = this.confirmed;

        const confirmBox: any = $(`
        <div class="modal fade" id="confirmBox" tabindex="-1" role="dialog" aria-labelledby="lblTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="lblTitle""><i class="fas fa-info-circle text-info mr-2"></i>Info</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
             <p id="lblMessage" class="font-weight-bold"></p>
              <div id="lblStack"></div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-sm btn-danger" id="btnOk" >OK</button>
              <button style="width: 100px" type="button" class="btn btn-sm btn-outline-secondary" id="btnCancel">Cancel</button>

            </div>
          </div>
        </div>
      </div>
        `);

        const lblTitle: any = confirmBox.find('#lblTitle');
        const lblMessage: any = confirmBox.find('#lblMessage');
        const btnCancel: any = confirmBox.find('#btnCancel');
        const btnOk: any = confirmBox.find('#btnOk');

        lblTitle.html(this.confirmTitle);
        lblMessage.html(this.confirmText);
        btnCancel.html(this.confirmCancel);
        btnOk.html(this.confirmOk);

        btnCancel.on('click', function () {
            confirmed.emit(false);
            confirmBox.modal('hide');
        });
        btnOk.on('click', function () {
            confirmed.emit(true);
            confirmBox.modal('hide');
        });

        confirmBox.modal('show');

    }

}

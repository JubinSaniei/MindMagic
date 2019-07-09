import { environment } from '../../environments/environment';
declare var $: any;

export class HttpResponseMessageHandler {

  static ErrorMsg(val: any) {

    const errorBox: any = $(`
        <div class="modal fade" id="errorBox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="myModalLabel"><i class="fas fa-exclamation-circle text-danger mr-2"></i>Error</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
             <p id="lblMessage" class="font-weight-bold"></p>
              <div id="lblStack"></div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-sm btn-outline-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
        `);

    if (!environment.production) {
      errorBox.find('#lblMessage').html(val.error);
      errorBox.find('#lblStack').html(val.message);
      errorBox.modal('show');
      return;
    } else {
      errorBox.find('#lblMessage').html(val.error);
      errorBox.modal('show');
      return;
    }

  }

  static InfoMsg(val: string) {

    const infoBox: any = $(`
        <div class="modal fade" id="infoBox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="myModalLabel"><i class="fas fa-info-circle text-info mr-2"></i>Info</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
             <p id="lblMessage" class="font-weight-bold"></p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-sm btn-outline-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
        `);


    infoBox.find('#lblMessage').html(val);
    infoBox.modal('show');
    return;

  }

  static AlertMsg(val: String) {

    const alertBox: any = $(`
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <p id="success-alert"></p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
             <span aria-hidden="true">&times;</span>
        </button>
    </div>
        `);

    // alertBox.find('#success-alert').html(val);
    alertBox.find('#success-alert').html('this is test');
    // alertBox.alert();
    $('.alert').alert();

    // $('#success-alert').fadeTo(2000, 500).slideUp(500, function () {
    //   $('#success-alert').slideUp(500);
    //   // $('div').removeClass('modal-backdrop');
    // });
    return;
  }
  // <div class="alert alert-success mt-5">
  //    <p id="success-alert"></p>
  // </div>

}

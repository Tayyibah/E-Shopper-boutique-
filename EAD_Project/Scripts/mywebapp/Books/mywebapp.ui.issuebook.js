MyWebApp.namespace("UI.IssueBook");

MyWebApp.UI.IssueBook = (function () {
    //var issueit = false;
    //var Title;
    //var bookdetail;
    function initialisePage() {      
        LoadProducts();
        BindEvent();
    }
    function BindEvent() {
        $("#btnSave1").unbind("click").bind('click', function (e) {
            e.preventDefault();
            SaveProduct();
            return false;
        });
        $("#addToCart").click(function () {
            addToCart();
            return false;
        });
        $("#btnClear").click(function () {
            Clear();
            return false;
        });
        $("#btnSend").click(function () {
            //Call send email function
            $("#emailpopup").hide();
            $("#overlay").hide();
            return false;
        });
        $("#btnClose").click(function () {
            $("#emailpopup").hide();
            $("#overlay").hide();
            return false;
        });



























        //$("#CancelPer").click(function (e) {
        //    window.location = $(this).attr(" href=~/Home/Dashboard");
        //    hideAll();
        //    return false;
        ////});
        //$("#issuedate").datepicker();
        //$("#duedate").datepicker();
        //$("#returndate").datepicker();


       

        $("#ModalClose1, #CancelPer").click(function (e) {
            e.preventDefault();
            hideAll();
            return false;
        });

        $("#BRFaccno").change(function () {
            FillReturnDate();
        });
        $("#accno").change(function () {
            AccNoCheck();
        });
        $("#issueto").change(function () {
            MemberSearch();
        });
        //$("#BRFaccno").change(function () {
        //    AccNoForBRF();
        //});
        $("#submit_return").unbind("click").bind('click', function (e) {

            e.preventDefault();
            if (
                $("#BRFaccno").val() === "" ||
                // $("#issueto").val() === "" ||
                $("#returndate").val() === ""
            ) {
                MyWebApp.UI.showRoasterMessage("Empty Field(s)", Enums.MessageType.Error, 2000);
            }
            else {
                var accno = parseInt($("#BRFaccno").val());
                // var mem = $("#issueto").val();
                var rdate = $("#returndate").val();
                MyWebApp.Globals.ShowYesNoPopup({
                    headerText: "Save",
                    bodyText: 'Do you want to Save this record?',
                    fnYesCallBack: function ($modalObj, dataObj) {

                        SubmitBRF();
                        $modalObj.hideMe()
                    }
                });
            }
            return false;
        });
        $('#Acc_No').bind('keypress', function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code === 13) {
                Status();
                e.preventDefault();
                return false;
            }
        });
    }


    function SaveProduct() {

        var data = new FormData();

        var id = $("#txtProductID").val();
        var name = $("#txtName").val();
        var price = $("#txtPrice").val();
        var oldPicName = $("#txtPictureName").val();

        data.append("ProductID", id);
        data.append("Name", name);
        data.append("Price", price);
        data.append("PictureName", oldPicName);


        var files = $("#myfile").get(0).files;
        if (files.length > 0) {
            data.append("Image", files[0]);
        }

        var settings = {
            type: "POST",
            // url: window.BasePath + 'Product2/Save'
            //  url: '/Save',
            url: "/Product2/Save",
            //  url: '~/Product2/Save',
            contentType: false,
            processData: false,
            data: data,
            success: function (r) {
                var obj = {};
                obj.data = [];
                obj.data.push({ ProductID: r.ProductID, Name: name, Price: price, PictureName: r.PictureName });

                var source = $("#listtemplate").html();
                var template = Handlebars.compile(source);

                var html = template(obj);

                if (id > 0) {
                    $("#tblBody tr[pid=" + id + "]").replaceWith(html);
                }
                else {
                    $("#tblBody").prepend(html);
                }

                BindEvents();

                Clear();

                alert("record is saved");
            },
            error: function () {
                alert('error has occured');
            }
        };

        $.ajax(settings);
    }

    function Clear() {
        $("#txtProductID").val(0);
        $("#txtPictureName").val("");
        $("#txtName").val("");
        $("#txtPrice").val("");
        $("#prodimg").hide();
    }
    function LoadProducts() {

        //var mem;
        //mem = $("#issueto").val();

        //if (mem.length <= 0) {
        //    MyWebApp.UI.showRoasterMessage("Member ID is Empty", Enums.MessageType.Error, 3000);

        //}
        //else {
            url = "Main/MemSearch/?member=" + 0;
            MyWebApp.Globals.MakeAjaxCall("POST", url, "{}", function (d) {
                if (d.exception === false) {
                    if (d.success === true) {
                        issueit = true;
                        MyWebApp.UI.showRoasterMessage("Member found", Enums.MessageType.Success, 2000);
                        if (d.data.Picture != "") {
                            $("#mp").attr('src', MyWebApp.Globals.baseURL + "UploadedFiles/" + d.data.Picture);
                        }
                        var d1 = new Date();
                        var d2 = new Date();
                        var setdate = d2.setDate(d2.getDate() + 14);
                        sdate = new Date(setdate);
                        $("#duedate").val(moment().add(d.data.Days, 'days').format("ll"));
                        $("#issuedate").val(moment(d1).format("ll"));
                    }
                    else {
                        MyWebApp.UI.showRoasterMessage(d.message, Enums.MessageType.Error, 2000);

                    }
                }
                else {
                    MyWebApp.UI.showRoasterMessage("An Error Occured", Enums.MessageType.Error, 2000);

                }
            }, function () { }, true, true);
        }







        MyAppGlobal.MakeAjaxCall("GET", 'Product2/GetAllProducts', {}, function (resp) {

            if (resp.data) {
                debugger;
                for (var k in resp.data) {
                    var obj = resp.data[k];
                    obj.CreatedOn = moment(obj.CreatedOn).format('DD/MM/YYYY HH:mm:ss');

                    for (var k2 in obj.Comments) {
                        var comm = obj.Comments[k2];
                        comm.CommentOn = moment(comm.CommentOn).format('DD/MM/YYYY HH:mm:ss');
                    }
                }


                var source = $("#listtemplate").html();
                var template = Handlebars.compile(source);

                var html = template(resp);
                $("#tblBody").append(html);


                $("#tblBody .addcomment").click(function () {

                    var mainProdContainer = $(this).closest(".item");
                    var pid = mainProdContainer.attr("pid");

                    var comment = $(this).closest(".commentarea").find(".txtComment").val();

                    var obj = {
                        ProductID: pid,
                        CommentText: comment
                    }


                    MyAppGlobal.MakeAjaxCall("POST", 'Product2/SaveComment', obj, function (resp) {

                        if (resp.success) {
                            alert("added");
                            debugger;

                            var obj1 = {
                                PictureName: resp.PictureName,
                                UserName: resp.UserName,
                                CommentText: obj.CommentText,
                                CommentOn: moment(resp.CommentOn).format('DD/MM/YYYY HH:mm:ss')
                            };

                            var source = $("#commenttemplate").html();
                            var template = Handlebars.compile(source);

                            var html = template(obj1);
                            mainProdContainer.find(".comments").append(html);

                        }

                    });

                    return false;
                });



                BindEvents();
            }
        });

    }


    var myDate = {};

    function Submit1() {
        // alert("Submit");
        ;
        var data = {};
        var NullData = {};
        data.Acc_No = $("#accno").val();
        data.Issue_date = $("#issuedate").val();
        data.Due_Date = $("#duedate").val();
        data.MemberID = $("#issueto").val();
        data.Lib_Mem_Id = $("#issueto").val();
        data.Return_Date = $('');
        if (data.Acc_No.length <= 0) {
            NullData.Acc_No = true;
        }
        else {
            NullData.Acc_No = false;
            if (isNaN(data.Acc_No)) {
                NullData.Acc_Number = true;
            }
            else {
                NullData.Acc_Number = false;
            }

        }
        if (data.Issue_date === 0 || data.Issue_date === '' || data.Issue_date === 'undefined' || data.Issue_date === null) {
            NullData.Issue_Date = true;
        }
        else {
            NullData.Issue_Date = false;
        }
        if (data.Due_Date === 0 || data.Due_Date === '' || data.Due_Date === 'undefined' || data.Due_Date === null) {
            NullData.Due_Date = true;
        }
        else {
            NullData.Due_Date = false;
        }
        if (data.Lib_Mem_Id.length <= 0) {
            NullData.Mem_Id = true;
        }
        else {
            NullData.Mem_Id = false;
        }
        if (NullData.Acc_No === true || NullData.Issue_Date === true || NullData.Due_Date === true) {

            MyWebApp.UI.showRoasterMessage("One of the Mandatory Field is Empty\n Please Review the form Again", Enums.MessageType.Error, 3000);

        }
        else {
            if (NullData.Acc_Number === true) {
                MyWebApp.UI.showRoasterMessage("Please Enter a Number in Acc_No", Enums.MessageType.Error, 3000);
            }
            else {

                url = "Main/BookIssueForm";
                MyWebApp.Globals.MakeAjaxCall("POST", url, JSON.stringify(data), function (result) {
                    console.log(result);
                    if (result.exception === false) {
                        if (result.success ==== true) {
                            MyWebApp.UI.showRoasterMessage(result.message, Enums.MessageType.Success);
                            clearFeilds();

                        }
                        if (result.success ==== false) {
                            MyWebApp.UI.showRoasterMessage(result.message, Enums.MessageType.Error, 5000);
                            clearFeilds();

                        }
                    }
                    else {
                        MyWebApp.UI.showRoasterMessage(result.message, Enums.MessageType.Error, 5000);
                        hideAll();
                    }
                }, function (xhr, ajaxOptions, thrownError) {

                    MyWebApp.UI.showRoasterMessage('There was a problem . "' + xhr.responseText + '". Please try again.', Enums.MessageType.Error);
                });

            }
        }
    }

    function AccNoCheck() {
        // alert("AccNo");
        var acc;
        acc = $("#accno").val();
        ;
        //alert(acc);
        if (acc.length <= 0) {
            MyWebApp.UI.showRoasterMessage('Acc_No is Empty', Enums.MessageType.Error);

        }
        else {
            if (isNaN(acc)) {
                MyWebApp.UI.showRoasterMessage("Please Enter a number", Enums.MessageType.Error);

            }
            else {

                url = "Main/SearchAccNo/?acc=" + acc;
                MyWebApp.Globals.MakeAjaxCall("POST", url, "{}", function (d) {

                    if (d.exception === false) {
                        if (d.success) {

                            Title = d.data[0];
                            if (d.message === "") {
                                $("#Title").val(d.data[0]);
                                $("#Author").val(d.data[1]);

                            }
                            else {

                                MyWebApp.UI.showRoasterMessage(d.message, Enums.MessageType.Error, 3000);

                            }


                        }
                        else {

                            MyWebApp.UI.showRoasterMessage(d.message, Enums.MessageType.Error, 3000);

                        }
                    }
                    else {
                        MyWebApp.UI.showRoasterMessage("An Error Occured", Enums.MessageType.Error, 3000);

                    }
                });
            }
        }

        // alert(data);
    }

    function MemberSearch() {
        //alert("AccNo");
        var mem;
        mem = $("#issueto").val();

        if (mem.length <= 0) {
            MyWebApp.UI.showRoasterMessage("Member ID is Empty", Enums.MessageType.Error, 3000);

        }
        else {
            url = "Main/MemSearch/?member=" + mem;
            MyWebApp.Globals.MakeAjaxCall("POST", url, "{}", function (d) {
                ;
                if (d.exception === false) {
                    if (d.success === true) {
                        issueit = true;
                        MyWebApp.UI.showRoasterMessage("Member found", Enums.MessageType.Success, 2000);
                        if (d.data.Picture != "") {
                            $("#mp").attr('src', MyWebApp.Globals.baseURL + "UploadedFiles/" + d.data.Picture);
                        }
                        var d1 = new Date();
                        var d2 = new Date();
                        var setdate = d2.setDate(d2.getDate() + 14);
                        sdate = new Date(setdate);
                        $("#duedate").val(moment().add(d.data.Days, 'days').format("ll"));
                        $("#issuedate").val(moment(d1).format("ll"));
                    }
                    else {
                        MyWebApp.UI.showRoasterMessage(d.message, Enums.MessageType.Error, 2000);

                    }
                }
                else {
                    MyWebApp.UI.showRoasterMessage("An Error Occured", Enums.MessageType.Error, 2000);

                }
            }, function () { }, true, true);
        }

    }

    function AccNoForBRF() {
        var acc;
        acc = $("#BRFaccno").val();

        if (acc.length <= 0) {

            MyWebApp.UI.showRoasterMessage("Acc_No is Empty", Enums.MessageType.Error, 2000);

        }
        else {
            if (isNaN(acc)) {

                MyWebApp.UI.showRoasterMessage("Please Enter a number", Enums.MessageType.Error, 2000);

            }
            else {

                url = "Main/SearchAccNoBRF/?acc=" + acc;
                MyWebApp.Globals.MakeAjaxCall("POST", url, "{}", function (d) {
                    if (d.exception === false) {
                        if (d.success) {

                            {
                                obj = d.data;
                                myDate.dDate = obj.dDate;
                                myDate.iDate = obj.iDate;
                                //var dI = d.data[0].Issue_date;
                                var due_date = moment(obj.iDate).format("ll");
                                //var dR = d.data[0].Due_Date;
                                var ret_date = moment(obj.dDate).format("ll");

                                $("#issuedate").val(due_date);
                                $("#duedate").val(ret_date);
                                $("#member").val(obj.Mem);
                                $("#Author").val(obj.Author);
                                $("#Title").val(obj.Title);
                            }



                        }
                        else {
                            MyWebApp.UI.showRoasterMessage("Book Can not be Returned", Enums.MessageType.Error, 2000);
                        }
                    }
                    else {
                        MyWebApp.UI.showRoasterMessage("An Error Occured.", Enums.MessageType.Error, 2000);

                    }
                });

            }
        }
    }
    function FillReturnDate() {
        $("#returndate").val(moment().format("ll"));
    }
    function SubmitBRF() {

        var data = {};
        data.Acc_No = $("#BRFaccno").val();
        // data.Member = $("#issueto").val();
        data.returnDate = $("#returndate").val();

        url = "Main/BookReturned";
        MyWebApp.Globals.MakeAjaxCall("POST", url, JSON.stringify(data), function (result) {
            console.log(result);
            if (result.exception === false) {
                if (result.success ==== true) {
                    if (result.fine != 0) {

                        //$("#finediv").show();
                        //$("#FineStringValue").text(result.fine);
                        MyWebApp.UI.showRoasterMessage("Fine for this book is " + result.fine, Enums.MessageType.Info, 10000);


                    }
                    MyWebApp.UI.showRoasterMessage(result.message, Enums.MessageType.Success);
                    hideAll();

                }
                else {
                    MyWebApp.UI.showRoasterMessage(result.message, Enums.MessageType.Error);
                    hideAll();
                }
            }
            else {
                MyWebApp.UI.showRoasterMessage(result.message, Enums.MessageType.Error, 5000);
                hideAll();
            }
        }, function (xhr, ajaxOptions, thrownError) {
            //;
            MyWebApp.UI.showRoasterMessage('There was a problem . "' + xhr.responseText + '". Please try again.', Enums.MessageType.Error);
        });

    }
    function FillBookDetail() {
        $("#bookdetail").show();
        $("#Acc_NoValue").text(bookdetail.Acc_No);
        $("#TitleValue").text(bookdetail.Title);
        $("#AuthorValue").text(bookdetail.Author);
        $("#DDC_NoValue").text(bookdetail.Dcc_No);
        $("#StatusStringValue").text(bookdetail.Status);
        $("#PublisherValue").text(bookdetail.Publisher);
        $("#LocationValue").text(bookdetail.Location);
    }

    function Status() {
        var acc = $("#Acc_No").val();
        if (acc.length <= 0) {
            MyWebApp.UI.showRoasterMessage("Please Enter Accession No", Enums.MessageType.Error, 2000);

        }
        else {
            url = "Main/BookStatus/?Acc_No=" + acc;
            MyWebApp.Globals.MakeAjaxCall("POST", url, "{}", function (result) {
                console.log(result);
                if (result.exception === false) {
                    if (result.success ==== true) {
                        bookdetail = result.data.BookDTO;
                        FillBookDetail();
                        $("#Acc_No").val("");

                    }
                    else if (result.success ==== false) {
                        MyWebApp.UI.showRoasterMessage("Book Not Found", Enums.MessageType.Error, 2000);
                        $("#bookdetail").hide();
                        $("#Acc_No").val("");


                    }
                }
                else {
                    MyWebApp.UI.showRoasterMessage("There was a problem", Enums.MessageType.Error, 5000);
                    hideAll();
                }
            }, function (xhr, ajaxOptions, thrownError) {
                //;
                MyWebApp.UI.showRoasterMessage('There was a problem finding book status. "' + xhr.responseText + '". Please try again.', Enums.MessageType.Error);
            });
        }

    }

    function hideAll() {
        clearFeilds();
    }

    function clearFeilds() {
        issueit = false;
        $("#Acc_No").val("");
        $("#accno").val("");
        $("#Title").val("");
        $("#Author").val("");
        $("#issuedate").val("");
        $("#duedate").val("");
        $("#issueto").val("");
        $("#BRFaccno").val("");
        $("#returndate").val("");
    }
    return {

        readyMain: function () {
            initialisePage();
        }
    };
}());


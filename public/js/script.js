
// UI INTERACTIONS / ANIMATIONS
$(document).ready(function(){
  $("#nav-icon3").click(function(){
    $("#nav-icon3").toggleClass("open");
    $(".sidebar").toggleClass("is-active");
    $(".body").toggleClass("active");
    $(".menu-option").toggleClass("active");

  });
  $(".moburger").click(function(){
    $(".mobile-sidebar").addClass("is-active");
  });
  $(".close-icon").click(function(){
    $(".mobile-sidebar").removeClass("is-active");
  });
});

// Function to tab switch among different sections of different pages
$(document).ready(function(){
  let searchParams = new URLSearchParams(window.location.search);
  searchParams.has('tab');
  let section = searchParams.get('tab');
  $('.carousel-grid > div').removeClass('active');
  $('#'+section).addClass('active');

  // Sidemenu navigator for student/department profiles.
  $('.dashboard-menu .menu-icon').removeClass('active');
  $('.'+section).find('.menu-icon').addClass('active');
});

// Function to tab switch among same page sections
function switchTab(tab_id)
{
  $('.carousel-grid > div').removeClass('active');
  $('#'+tab_id).addClass('active');

  // Sidemenu navigator for student/department profiles
  $('.dashboard-menu .menu-icon').removeClass('active');
  $('.'+tab_id).find('.menu-icon').addClass('active');
}

// Function to check if the tab you want to access is in the same page or different page
$(document).ready(function(){
  $('a').on("click",function(e){
    let cur_url = window.location.href; // current url
    let cur_link = cur_url.split('?')[0].split('/')[4]; // current html file
    let url = $(this).attr('href'); // url to redirect
    let red_link = url.split('?')[0]; // html file to load.
    let red_tab = url.split('?')[1].split('=')[1]; // section to load.
    if(cur_link == red_link) // if both the html pages match that means the section to load is in the same page.
    {
      e.preventDefault(); // prevent redirection
      switchTab(red_tab); // load section
      const state = { 'page_id': 1, 'user_id': 5 };  // push it in the history and update the url
      const title = 'Student Welfare Office, MNNIT';
      history.pushState(state, title, url);
    }
  });
});
// POPUP INTERACTIONS
function popup(i)
{
  $('.overlay').eq(i).toggleClass("active");
}

// IMAGE Gallery interactions
$(document).ready(function(){
  $(".img-grid .thumbnail").on("click",function(){
    let image = $(this).find(".thumbnail-image").attr("style");
    $(".img-big").attr("style",image);
    popup(2);
  });
});

//Toggle between no dues activities
$(document).ready(function(){
  $(".drop-tab").on( "click", function(){
    $(this).find(".activity-tab").toggleClass("active");
    $(this).find(".glyphicon").toggleClass("rotate");
  });
});

// Interaction to view reason textbox when applying for a no dues.
$(document).ready(function(){
  $('#noduesform input:radio').on("click",function(){
    if($(this).attr('id') == 'coursenotcompleted')
      $('#noduesform #description').addClass('active');
    else
      $('#noduesform #description').removeClass('active');
  });
});

//------------------------ Form interaction while filling a fresh scholarship form---------------------------------------------------------
//on load / refresh default values in Funding Agency and Scholarship Name based on selected Scheme.
let scholarship_session;
let scholarship_scheme_name;
let scholarship_agency_name;
let scholarship_name;

let scholarship_scheme_no;        // condition variable for schemes dropdown
let scholarship_agency_no;        // condition variable for agency dropdown
$(window).on("load",function(){
  scholarship_scheme_no = parseInt($("#scholarship-scheme option:selected").val());
  scholarship_scheme_name = $("#scholarship-scheme option:selected").html();
  $('#scholarship-agency-select').addClass("active");
  $('#scholarship-name-select').addClass("active");
  $('#scholarship-agency-textbox').removeClass("active");
  $('#scholarship-name-textbox').removeClass("active");
  $('#scholarship-agency-textbox input').val("");
  $('#scholarship-name-textbox input').val("");
  if(scholarship_scheme_no == 1)
  {
    $('#scholarship-agency-select select').html(`<option value="1">Ministry Of Minority Affairs</option>
                                                 <option value="2">Department of Empowerment of Persons with Disabilities</option>
                                                 <option value="3">Minstry of Social Justice and Empowerment</option>
                                                 <option value="4">Ministry of Labour and Employment</option>
                                                 <option value="5">Ministry of Tribal Affairs</option>
                                                 <option value="6">Department of School Education and Literacy</option>
                                                 <option value="7">Department of Higher Education</option>
                                                 <option value="8">WARB, Ministry Of Home Affairs</option>
                                                 <option value="9">RPF/RPSF, Ministry of Railway</option>
                                                 <option value="10">Other</option>`);
    scholarship_agency_name = $("#scholarship-agency-select select option:selected").html();
    $('#scholarship-name-select select').html(`<option value="1">Post Matric Scholarships Scheme for Minorities</option>
                                               <option value="2">Merit Cum Means Scholarship For Professional and Technical Courses CS</option>`);
    scholarship_name = $("#scholarship-name-select select option:selected").html();
  }
  else if(scholarship_scheme_no == 2)
  {
    $('#scholarship-agency-select select').html(`<option value="1">University Grants Commission -MHRD</option>
                                                 <option value ="2">Other</option>`);
    scholarship_agency_name = $("#scholarship-agency-select select option:selected").html();
    $('#scholarship-name-select select').html(`<option value="1">ISHAN UDAY - Special Scholarship Scheme For North Eastern Region</option>
                                               <option value="2">PG INDIRA GANDHI SCHOLARSHIP FOR SINGLE GIRL CHILD</option>
                                               <option value="3">PG SCHOLARSHIP FOR UNIVERSITY RANK HOLDERS(Ist and IInd RANK HOLDERS)</option>
                                               <option value="4">PG SCHOLARSHIP SCHEME FOR SC ST STUDENTS FOR PERSUING PROFESSIONAL COURSES</option>`);
    scholarship_name = $("#scholarship-name-select select option:selected").html();
  }
  else if(scholarship_scheme_no == 3)
  {
    $('#scholarship-agency-select select').html(`<option value="1">Ministry Of Human Resource Development - AICTE</option>
                                                 <option value="2">Other</option>`);
    scholarship_agency_name = $("#scholarship-agency-select select option:selected").html();
    $('#scholarship-name-select select').html(`<option value="1">PRAGATI SCHOLARSHIP SCHEME FOR GIRLS (DEGREE) For Technical education</option>
                                                <option value="2">PRAGATI SCHOLARSHIP SCHEME FOR GIRLS (DIPLOMA) For Technical education</option>
                                                <option value="3">SAKSHAM SCHOLARSHIP SCHEME FOR DIFFERENTLY ABLED STUDENTS (DEGREE) For Technical education</option>
                                                <option value="4">SAKSHAM SCHOLARSHIP SCHEME FOR DIFFERENTLY ABLED STUDENTS (DIPLOMA) For Technical education</option>`);
    scholarship_name = $("#scholarship-name-select select option:selected").html();
  }
  else if(scholarship_scheme_no == 4)
  {
    $('#scholarship-agency-select select').html(`<option value="1">Assam</option>
                                                 <option value="2">Chandigarh</option>
                                                 <option value="3">Bihar</option>
                                                 <option value="4">Uttarakhand</option>
                                                 <option value="5">Tripura</option>
                                                 <option value="6">Karnataka</option>
                                                 <option value="7">Meghalaya</option>
                                                 <option value="8">Arunachal Pradesh</option>`);
    scholarship_agency_name = $("#scholarship-agency-select select option:selected").html();
    $('#scholarship-name-select select').html(`<option value="1">POST MATRIC SCHOLARSHIP FOR SC STUDENTS - ASSAM</option>
                                                <option value="2">POST MATRIC SCHOLARSHIP TO OBC STUDENTS - ASSAM</option>
                                                <option value="3">POST MATRIC SCHOLARSHIP TO ST STUDENTS - ASSAM</option>
                                                <option value="4">SAKSHAM SCHOLARSHIP SCHEME FOR DIFFERENTLY ABLED STUDENTS (DIPLOMA) For Technical education</option>`);
    scholarship_name = $("#scholarship-name-select select option:selected").html();
  }
  else if(scholarship_scheme_no == 5)
  {
    $('#scholarship-agency-select select').html(`<option value="1">Andhra Pradesh</option>
                                                 <option value="2">Chhattisgarh</option>
                                                 <option value="3">Jharkhand</option>
                                                 <option value="4">Kerala</option>
                                                 <option value="5">Madhya Pradesh</option>
                                                 <option value="6">Telangana</option>
                                                 <option value="7">Uttar Pradesh</option>
                                                 <option value="8">Rajasthan</option>
                                                 <option value="9">Other</option>`);
    scholarship_agency_name = $("#scholarship-agency-select select option:selected").html();
    $('#scholarship-name-select').removeClass("active");
    $('#scholarship-name-textbox').addClass("active");
  }
  else if(scholarship_scheme_no == 6)
  {
    $('#scholarship-agency-select select').html(`<option value="1">MNNIT Allahabad</option>
                                                 <option value="2">Other</option>`);
    scholarship_agency_name = $("#scholarship-agency-select select option:selected").html();
    $('#scholarship-name-select select').html(`<option value="1">MNNIT Allahabad</option>`);
    scholarship_name = $("#scholarship-name-select select option:selected").html();
  }
  else if(scholarship_scheme_no == 7)
  {
    $('#scholarship-agency-select select').html(`<option value="1">MNNIT Allahabad</option>
                                                 <option value="2">Other</option>`);
    scholarship_agency_name = $("#scholarship-agency-select select option:selected").html();
    $('#scholarship-name-select select').html(`<option value="1">Institute Merit Scholarship</option>`);
    scholarship_name = $("#scholarship-name-select select option:selected").html();
  }
  else if(scholarship_scheme_no == 8)
  {
    $('#scholarship-agency-select select').html(`<option value="1">OP-GEMS Scholarship</option>
                                                 <option value="2">Other</option>`);
    scholarship_agency_name = $("#scholarship-agency-select select option:selected").html();
    $('#scholarship-name-select select').html(`<option value="1">OP-GEMS Scholarship</option>`);
    scholarship_name = $("#scholarship-name-select select option:selected").html();
  }
  else if(scholarship_scheme_no == 9)
  {
    $('#scholarship-agency-textbox').addClass("active");
    $('#scholarship-name-textbox').addClass("active");
    $('#scholarship-name-select').removeClass("active");
    $('#scholarship-agency-select').removeClass("active");
  }
});

//on click/change interaction of default values in Funding Agency and Scholarship Name based on selected Scheme.
$(document).ready(function(){
  $("#scholarship-scheme").on("change",function(){
    scholarship_scheme_no = parseInt($(this).val());
    scholarship_scheme_name = $("#scholarship-scheme option:selected").html();
    $('#scholarship-agency-select').addClass("active");
    $('#scholarship-name-select').addClass("active");
    $('#scholarship-agency-textbox').removeClass("active");
    $('#scholarship-name-textbox').removeClass("active");
    $('#scholarship-agency-textbox input').val("");
    $('#scholarship-name-textbox input').val("");
    if(scholarship_scheme_no == 1)
    {
      $('#scholarship-agency-select select').html(`<option value="1">Ministry Of Minority Affairs</option>
                                                   <option value="2">Department of Empowerment of Persons with Disabilities</option>
                                                   <option value="3">Minstry of Social Justice and Empowerment</option>
                                                   <option value="4">Ministry of Labour and Employment</option>
                                                   <option value="5">Ministry of Tribal Affairs</option>
                                                   <option value="6">Department of School Education and Literacy</option>
                                                   <option value="7">Department of Higher Education</option>
                                                   <option value="8">WARB, Ministry Of Home Affairs</option>
                                                   <option value="9">RPF/RPSF, Ministry of Railway</option>
                                                   <option value="10">Other</option>`);
      scholarship_agency_name = $("#scholarship-agency-select select option:selected").html();
      $('#scholarship-name-select select').html(`<option>Post Matric Scholarships Scheme for Minorities</option>
                                                 <option>Merit Cum Means Scholarship For Professional and Technical Courses CS</option>`);
      scholarship_name = $("#scholarship-name-select select option:selected").html();
    }
    else if(scholarship_scheme_no == 2)
    {
      $('#scholarship-agency-select select').html(`<option value="1">University Grants Commission -MHRD</option>
                                                   <option value ="2">Other</option>`);
      scholarship_agency_name = $("#scholarship-agency-select select option:selected").html();
      $('#scholarship-name-select select').html(`<option value="1">ISHAN UDAY - Special Scholarship Scheme For North Eastern Region</option>
                                                 <option value="2">PG INDIRA GANDHI SCHOLARSHIP FOR SINGLE GIRL CHILD</option>
                                                 <option value="3">PG SCHOLARSHIP FOR UNIVERSITY RANK HOLDERS(Ist and IInd RANK HOLDERS)</option>
                                                 <option value="4">PG SCHOLARSHIP SCHEME FOR SC ST STUDENTS FOR PERSUING PROFESSIONAL COURSES</option>`);
      scholarship_name = $("#scholarship-name-select select option:selected").html();
    }
    else if(scholarship_scheme_no == 3)
    {
      $('#scholarship-agency-select select').html(`<option value="1">Ministry Of Human Resource Development - AICTE</option>
                                                   <option value="2">Other</option>`);
      scholarship_agency_name = $("#scholarship-agency-select select option:selected").html();
      $('#scholarship-name-select select').html(`<option value="1">PRAGATI SCHOLARSHIP SCHEME FOR GIRLS (DEGREE) For Technical education</option>
                                                  <option value="2">PRAGATI SCHOLARSHIP SCHEME FOR GIRLS (DIPLOMA) For Technical education</option>
                                                  <option value="3">SAKSHAM SCHOLARSHIP SCHEME FOR DIFFERENTLY ABLED STUDENTS (DEGREE) For Technical education</option>
                                                  <option value="4">SAKSHAM SCHOLARSHIP SCHEME FOR DIFFERENTLY ABLED STUDENTS (DIPLOMA) For Technical education</option>`);
      scholarship_name = $("#scholarship-name-select select option:selected").html();
    }
    else if(scholarship_scheme_no == 4)
    {
      $('#scholarship-agency-select select').html(`<option value="1">Assam</option>
                                                   <option value="2">Chandigarh</option>
                                                   <option value="3">Bihar</option>
                                                   <option value="4">Uttarakhand</option>
                                                   <option value="5">Tripura</option>
                                                   <option value="6">Karnataka</option>
                                                   <option value="7">Meghalaya</option>
                                                   <option value="8">Arunachal Pradesh</option>`);
      scholarship_agency_name = $("#scholarship-agency-select select option:selected").html();
      $('#scholarship-name-select select').html(`<option value="1">POST MATRIC SCHOLARSHIP FOR SC STUDENTS - ASSAM</option>
                                                  <option value="2">POST MATRIC SCHOLARSHIP TO OBC STUDENTS - ASSAM</option>
                                                  <option value="3">POST MATRIC SCHOLARSHIP TO ST STUDENTS - ASSAM</option>
                                                  <option value="4">SAKSHAM SCHOLARSHIP SCHEME FOR DIFFERENTLY ABLED STUDENTS (DIPLOMA) For Technical education</option>`);
      scholarship_name = $("#scholarship-name-select select option:selected").html();
    }
    else if(scholarship_scheme_no == 5)
    {
      $('#scholarship-agency-select select').html(`<option value="1">Andhra Pradesh</option>
                                                   <option value="2">Chhattisgarh</option>
                                                   <option value="3">Jharkhand</option>
                                                   <option value="4">Kerala</option>
                                                   <option value="5">Madhya Pradesh</option>
                                                   <option value="6">Telangana</option>
                                                   <option value="7">Uttar Pradesh</option>
                                                   <option value="8">Rajasthan</option>
                                                   <option value="9">Other</option>`);
      scholarship_agency_name = $("#scholarship-agency-select select option:selected").html();
      $('#scholarship-name-select').removeClass("active");
      $('#scholarship-name-textbox').addClass("active");
    }
    else if(scholarship_scheme_no == 6)
    {
      $('#scholarship-agency-select select').html(`<option value="1">MNNIT Allahabad</option>
                                                   <option value="2">Other</option>`);
      scholarship_agency_name = $("#scholarship-agency-select select option:selected").html();
      $('#scholarship-name-select select').html(`<option value="1">MNNIT Allahabad</option>`);
      scholarship_name = $("#scholarship-name-select select option:selected").html();
    }
    else if(scholarship_scheme_no == 7)
    {
      $('#scholarship-agency-select select').html(`<option value="1">MNNIT Allahabad</option>
                                                   <option value="2">Other</option>`);
      scholarship_agency_name = $("#scholarship-agency-select select option:selected").html();
      $('#scholarship-name-select select').html(`<option value="1">Institute Merit Scholarship</option>`);
      scholarship_name = $("#scholarship-name-select select option:selected").html();
    }
    else if(scholarship_scheme_no == 8)
    {
      $('#scholarship-agency-select select').html(`<option value="1">OP-GEMS Scholarship</option>
                                                   <option value="2">Other</option>`);
      scholarship_agency_name = $("#scholarship-agency-select select option:selected").html();
      $('#scholarship-name-select select').html(`<option value="1">OP-GEMS Scholarship</option>`);
      scholarship_name = $("#scholarship-name-select select option:selected").html();
    }
    else if(scholarship_scheme_no == 9)
    {
      $('#scholarship-agency-textbox').addClass("active");
      $('#scholarship-name-textbox').addClass("active");
      $('#scholarship-name-select').removeClass("active");
      $('#scholarship-agency-select').removeClass("active");
    }
  });
});

// onchange of Scholarship Agency Select
$(document).ready(function(){
  $("#scholarship-agency-select select").on("change",function(){
    scholarship_scheme_no = parseInt($("#scholarship-scheme option:selected").val());
    scholarship_agency_no = parseInt($("#scholarship-agency-select select option:selected").val());
    $('#scholarship-name-select').addClass("active");
    $('#scholarship-name-textbox').removeClass("active");
    $('#scholarship-agency-textbox input').val("");
    $('#scholarship-name-textbox input').val("");
    if(scholarship_scheme_no == 1)
    {
      if(scholarship_agency_no == 1)
      {
        $('#scholarship-name-select select').html(`<option value="1">Post Matric Scholarships Scheme for Minorities</option>
                                                   <option value="2">Merit Cum Means Scholarship For Professional and Technical Courses CS</option>`);
      }
      else if(scholarship_agency_no == 2)
      {
        $('#scholarship-name-select select').html(`<option value="1">Post-matric Scholarship for Students with Disabilities</option>
                                                   <option value="2">Scholarships for Top Class Education for students with disabilities</option>`);
      }
      else if(scholarship_agency_no == 3)
      {
        $('#scholarship-name-select select').html(`<option value="1">Top Class Education Scheme for SC Students</option>`);
      }
      else if(scholarship_agency_no == 4)
      {
        $('#scholarship-name-select select').html(`<option value="1">Financial Assistance for Education of the Wards of Beedi/Cine/IOMC/LSDM Workers - Post-Matric</option>
                                                   <option value="2">Aam Aadmi Bima Yojna Scholarship for Andhra Pradesh</option>`);
      }
      else if(scholarship_agency_no == 5)
      {
        $('#scholarship-name-select select').html(`<option value="1">National Fellowship and Scholarship for Higher Education of ST Students - Scholarship (Formally Top Class Education for Schedule Tribe Students) - only for scholarships</option>`);
      }
      else if(scholarship_agency_no == 6)
      {
        $('#scholarship-name-select select').html(`<option value="1"> National Scheme of Incentive to Girls for Secondary Education(NSIGSE)</option>
                                                   <option value="2"> National Means Cum Merit Scholarship</option>`);
      }
      else if(scholarship_agency_no == 7)
      {
        $('#scholarship-name-select select').html(`<option value="1"> CENTRAL SECTOR SCHEME OF SCHOLARSHIPS FOR COLLEGE AND UNIVERSITY STUDENTS</option>`);
      }
      else if(scholarship_agency_no == 8)
      {
        $('#scholarship-name-select select').html(`<option value="1"> Prime Minister's Scholarship Scheme For Central Armed Police Forces And Assam Rifles</option>`);
      }
      else if(scholarship_agency_no == 9)
      {
        $('#scholarship-name-select select').html(`<option value="1">Prime Minister's Scholarship Scheme For RPF/RPSF</option>`);
      }
      else if(scholarship_agency_no == 10)
      {
        $('#scholarship-name-select').removeClass("active");
        $('#scholarship-name-textbox').addClass("active");
      }
    }
    else if(scholarship_scheme_no == 2)
    {
      if(scholarship_agency_no == 1)
      {
        $('#scholarship-name-select select').html(`<option value="1">ISHAN UDAY - Special Scholarship Scheme For North Eastern Region</option>
                                                    <option value="2">PG INDIRA GANDHI SCHOLARSHIP FOR SINGLE GIRL CHILD</option>
                                                    <option value="3">PG SCHOLARSHIP FOR UNIVERSITY RANK HOLDERS(Ist and IInd RANK HOLDERS)</option>
                                                    <option value="4">PG SCHOLARSHIP SCHEME FOR SC ST STUDENTS FOR PERSUING PROFESSIONAL COURSES</option>`);
      }
      else if(scholarship_agency_no == 2)
      {
        $('#scholarship-name-select').removeClass("active");
        $('#scholarship-name-textbox').addClass("active");
      }
    }
    else if(scholarship_scheme_no == 3)
    {
      if(scholarship_agency_no == 1)
      {
        $('#scholarship-name-select select').html(`<option value="1">PRAGATI SCHOLARSHIP SCHEME FOR GIRLS (DEGREE) For Technical education</option>
                                                    <option value="2">PRAGATI SCHOLARSHIP SCHEME FOR GIRLS (DIPLOMA) For Technical education</option>
                                                    <option value="3">SAKSHAM SCHOLARSHIP SCHEME FOR DIFFERENTLY ABLED STUDENTS (DEGREE) For Technical education</option>
                                                    <option value="4">SAKSHAM SCHOLARSHIP SCHEME FOR DIFFERENTLY ABLED STUDENTS (DIPLOMA) For Technical education</option>`);
      }
      else if(scholarship_agency_no == 2)
      {
        $('#scholarship-name-select').removeClass("active");
        $('#scholarship-name-textbox').addClass("active");
      }
    }
    else if(scholarship_scheme_no == 4)
    {
      if(scholarship_agency_no == 1)
      {
        $('#scholarship-name-select select').html(`<option value="1">POST MATRIC SCHOLARSHIP FOR SC STUDENTS - ASSAM</option>
                                                    <option value="2">POST MATRIC SCHOLARSHIP TO OBC STUDENTS - ASSAM</option>
                                                    <option value="3">POST MATRIC SCHOLARSHIP TO ST STUDENTS - ASSAM</option>`);
      }
      else if(scholarship_agency_no == 2)
      {
        $('#scholarship-name-select select').html(`<option value="1">POST MATRIC SCHOLARSHIP FOR SC STUDENTS-CHANDIGARH</option>
                                                    <option value="2">POST MATRIC SCHOLARSHIP SCHEME FOR TRANSGENDER STUDENTS-CHANDIGARH</option>
                                                    <option value="3">POST MATRIC SCHOLARSHIP SCHEME FOR OBC STUDENTS-CHANDIGARH</option>
                                                    <option value="4">DR.AMBEDKAR POST MATRIC SCHOLARSHIP FOR ECONOMICALLY BACKWARD CLASS STUDENTS-CHANDIGARH</option>`);
      }
      else if(scholarship_agency_no == 3)
      {
        $('#scholarship-name-select select').html(`<option value="1">BC-EBC POST MATRIC SCHOLARSHIP-BIHAR</option>
                                                    <option value="2">ST-POST MATRIC SCHOLARSHIP -BIHAR</option>
                                                    <option value="3">SC POST-MATRIC SCHOLARSHIP -BIHAR</option>`);
      }
      else if(scholarship_agency_no == 4)
      {
        $('#scholarship-name-select select').html(`<option value="1">Post Matric Scholarship for EBC Students-Uttarakhand</option>
                                                    <option value="2">Post-Matric Scholarship for ST Students-Uttarakhand</option>
                                                    <option value="3">Post-Matric Scholarship for SC Students-Uttarakhand</option>
                                                    <option value="4">Post-Matric Scholarship for OBC Students-Uttarakhand</option>`);
      }
      else if(scholarship_agency_no == 5)
      {
        $('#scholarship-name-select select').html(`<option value="1">DR.AMBEDKAR POST MATRIC SCHOLARSHIP FOR ECONOMICALLY BACKWARD CLASSES (EBC)(SECONDARY EDUCATION)-TRIPURA</option>
                                                    <option value="2">POST-MATRIC ST SCHOLARSHIP SCHEMES</option>
                                                    <option value="3">POST-MATRIC SCHOLARSHIP FOR SC STUDENTS TRIPURA</option>
                                                    <option value="4">POST MATRIC SCHOLARSHIP FOR OBC STUDENTS TRIPURA</option>
                                                    <option value="5">Dr. B.R. AMBEDKAR POST MATRIC SCHOLARSHIP FOR ECONOMICALLY BACKWARD CLASSES (EBC). - TRIPURA</option>
                                                    <option value="6">NEC Merit Scholarship Tripura</option>`);
      }
      else if(scholarship_agency_no == 6)
      {
        $('#scholarship-name-select select').html(`<option value="1">POST MATRIC SCHOLARSHIP(PMS) FOR ST STUDENTS - KARNATAKA</option>`);
      }
      else if(scholarship_agency_no == 7)
      {
        $('#scholarship-name-select select').html(`<option value="1">UMBRELLA SCHEME FOR EDUCATION OF ST CHILDREN - POST-MATRIC SCHOLARSHIP (PMS) FOR ST STUDENTS - MEGHALAYA</option>`);
      }
      else if(scholarship_agency_no == 8)
      {
        $('#scholarship-name-select select').html(`<option value="1">Umbrella Scheme for Education of ST Children -Post Matric Scholarship (PMS) for ST Students Arunachal Pradesh</option>
                                                   <option value="2">Scheme for Award of Stipend to the schedule tribe students of Arunachal Pradesh</option>`);
      }
    }
    else if(scholarship_scheme_no == 5)
    {
      $('#scholarship-name-select').removeClass("active");
      $('#scholarship-name-textbox').addClass("active");
    }
    else if(scholarship_scheme_no == 6)
    {
      if(scholarship_agency_no == 1)
      {
        $('#scholarship-name-select select').html(`<option value="1">Institute Merit Scholarship</option>`);
      }
      else if(scholarship_agency_no == 2)
      {
        $('#scholarship-name-select').removeClass("active");
        $('#scholarship-name-textbox').addClass("active");
      }
    }
    else if(scholarship_scheme_no == 7)
    {
      if(scholarship_agency_no == 1)
      {
        $('#scholarship-name-select select').html(`<option value="1">Institute Merit Scholarship</option>`);
      }
      else if(scholarship_agency_no == 2)
      {
        $('#scholarship-name-select').removeClass("active");
        $('#scholarship-name-textbox').addClass("active");
      }
    }
    else if(scholarship_scheme_no == 8)
    {
      if(scholarship_agency_no == 1)
      {
        $('#scholarship-name-select select').html(`<option value="1">OP - GEMS Scholarship</option>`);
      }
      else if(scholarship_agency_no == 2)
      {
        $('#scholarship-name-select').removeClass("active");
        $('#scholarship-name-textbox').addClass("active");
      }
    }
    else if(scholarship_scheme_no == 9)
    {
      $('#scholarship-agency-textbox').addClass("active");
      $('#scholarship-name-textbox').addClass("active");
      $('#scholarship-name-select').removeClass("active");
      $('#scholarship-agency-select').removeClass("active");
    }
  });
});

// Function to populate preview popups
function previewFreshScholarship()
{
  // Fetch all the values from textboxes and select dropdowns
  scholarship_session = $("#scholarship-session").val();
  scholarship_scheme_name = $("#scholarship-scheme option:selected").html();
  scholarship_agency_text = $("#scholarship-agency-textbox input").val();
  scholarship_name_text = $("#scholarship-name-textbox input").val();
  let agency_textbox_active = $("#scholarship-agency-textbox").attr("class");
  let name_textbox_active = $("#scholarship-name-textbox").attr("class");

  // select from either an open textbox or an opened dropdown box.
  if(scholarship_agency_text == "" && agency_textbox_active != "active")
    scholarship_agency_name = $("#scholarship-agency-select select option:selected").html();
  else
    scholarship_agency_name = scholarship_agency_text;

  if(scholarship_name_text == "" && name_textbox_active != "active")
    scholarship_name = $("#scholarship-name-select select option:selected").html();
  else
    scholarship_name = scholarship_name_text;

 // Check if all required files are selected to upload.
  var allFiles = true;
    $('.scholarship-application input[type=file]').filter('[required]').each(function(){
      if ($(this).val() === '') {
        allFiles = false;
      }
    });

  // Check if the form checkbox is checked.
  var agreement = $('.scholarship-application input[type=checkbox]').is(":checked");
  if(!scholarship_session || !scholarship_scheme_name || !scholarship_agency_name || !scholarship_name || !allFiles || !agreement)
    alert("Please Complete all the fields of the form");
  else // if all conditions are met..
  {
    popup(4); // open the preview popup.

    //Preview inputed Form data.
    $('#fresh-scholarship-form #scholarship-session-preview').html(scholarship_session);
    $('#fresh-scholarship-form #scholarship-scheme-preview').html(scholarship_scheme_name);
    $('#fresh-scholarship-form #scholarship-agency-preview').html(scholarship_agency_name);
    $('#fresh-scholarship-form #scholarship-name-preview').html(scholarship_name);

    // Preview Uploaded Files :
    pdffile=document.getElementsByName("bonafide")[0].files[0];
    pdffile_url=URL.createObjectURL(pdffile);
    $('#fresh-scholarship-form #bonafide-preview').attr('src',pdffile_url);

    pdffile1=document.getElementsByName("feereciept")[0].files[0];
    pdffile_url1=URL.createObjectURL(pdffile1);
    $('#fresh-scholarship-form #feereciept-preview').attr('src',pdffile_url1);

    pdffile2=document.getElementsByName("transcript")[0].files[0];
    pdffile_url2=URL.createObjectURL(pdffile2);
    $('#fresh-scholarship-form #transcript-preview').attr('src',pdffile_url2);

    pdffile3=document.getElementsByName("income1")[0].files[0];
    pdffile_url3=URL.createObjectURL(pdffile3);
    $('#fresh-scholarship-form #income1-preview').attr('src',pdffile_url3);
  }
}
// Function to submit fresh scholarship form
function applyFreshScholarship()
{
  $('.scholarship-application').submit();
  setTimeout(function(){
    window.location='studentprofile.html?tab=fresh-scholarship';
  }, 3);
}
//----------- Script for Fresh Scholarship Application Ends here ---------------

//---------- Script for UI Interaction NoDues (Departments) --------------------

// select all interactions
$('#select-all').on('click', function(){
  let make_all = $('#select-all').val();
  if(make_all == 'approve')
  {
      $('.select-choice').val('approve');
      $('.reject-reason-tb').css({'display' : 'none'});
  }
  else if(make_all == 'reject') {
    $('.select-choice').val('reject');
    $('.reject-reason-tb').css({'display' : 'block'});
  }
});

//select single interaction
$(".select-choice").on('click', function(){
  let action = $(this).val();
  if(action == 'approve')
  {
      $(this).siblings(".reject-reason-tb").css({"display":"none"});
  }
  else if(action == 'reject') {
    $(this).siblings(".reject-reason-tb").css({"display":"block"});
  }
});

// new no dues request tab
$('#nodue-btn-new').on('click', function(){
  $('.nodue-buttons > button').removeClass("active");
  $('#nodue-btn-new').addClass("active");

  $('.nodue-tab').removeClass("active");
  $('#nodue-tab-new').addClass("active");
});

// approved request tab
$('#nodue-btn-approve').on('click', function(){
  $('.nodue-buttons > button').removeClass("active");
  $('#nodue-btn-approve').addClass("active");

  $('.nodue-tab').removeClass("active");
  $('#nodue-tab-approved').addClass("active");
});

// rejected request tab
$('#nodue-btn-reject').on('click', function(){
  $('.nodue-buttons > button').removeClass("active");
  $('#nodue-btn-reject').addClass("active");

  $('.nodue-tab').removeClass("active");
  $('#nodue-tab-rejected').addClass("active");
});
//------------------------------------------------------------------------------

//----------------------- UI Interaction Punishments (Department) --------------

$('.select-punishment select').on('click', function(){
  if($(this).val() == "yes")
  {
      $(this).siblings('.reject-reason-tb').addClass("active");
  }
  else {
    $(this).siblings('.reject-reason-tb').removeClass("active");
    $(this).siblings('.reject-reason-tb').val("");
  }
})

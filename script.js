function myFunction() {
    var sheet_id = '1VZZedsz_vya4C3fEOBxQ_3S1ga6WLiSuvempq5Ow7EU'
    
  
    var worksheet = SpreadsheetApp.openById(sheet_id)
      var sheet_name = SpreadsheetApp.openById(sheet_id).getSheetName()
      var sheet = worksheet.getSheets()[0];
      Logger.log(sheet)
    var data = sheet.getDataRange().getValues();
  
    var skills = []
    var skill_types = []
    var course_name = data[1][1]
    var course_code = data[1][0]
  
    for(var i = 1; i < data.length; i++){
      skills.push(data[i][3])
      skill_types.push(data[i][2])
    }
    skills = removeEmptyValues(skills,skill_types)
     Logger.log(data[1][0])
    Logger.log(data[1][1])
    Logger.log(skills)
  
    createForm(sheet_name, skills, course_name, course_code)
  
  }
  
  
  function createForm(sheet_name, skills, course_name, course_code){
    // Creating form
    var form = FormApp.create(sheet_name);
    form.setTitle(sheet_name);
    form.setDescription(course_code + " - " + course_name)
    var formId = form.getId();
    
    form.addTextItem().setTitle('Employee Id').setRequired(true);
    form.addTextItem().setTitle('Employee name').setRequired(true);
    var gridItem = form.addGridItem().setTitle('Training requirement').setRequired(true);
    gridItem.setRows(skills)
    gridItem.setColumns(['Yes', 'No']);
  }
  
  
  
  function removeEmptyValues(list,skill_types ){
    var newList = [];
  for(var i = 0; i < list.length; i++){
  if (list[i]!=''){
    newList.push(list[i] + " ("+skill_types[i]+")")
  }
  }
  return(newList)
  }
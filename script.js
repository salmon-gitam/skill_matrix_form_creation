function myFunction() {
    var sheet_id = '1VZZedsz_vya4C3fEOBxQ_3S1ga6WLiSuvempq5Ow7EU'
    var course_code = "CSExxxxx"
  
    var sheet = SpreadsheetApp.openById(sheet_id).getSheetByName(course_code);
    var data = sheet.getDataRange().getValues();
  
    var skills = []
    var skill_types = []
  
    for(var i = 1; i < data.length; i++){
      skills.push(data[i][3])
      skill_types.push(data[i][2])
    }
    skills = removeEmptyValues(skills,skill_types)
    Logger.log(skills)
  
    createForm(course_code, skills)
  
  }
  
  
  function createForm(course_code, skills){
    // Creating form
    var form = FormApp.create(course_code);
    form.setTitle(course_code);
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
describe('Test import', function() {
  it('should import all requested properly', function () {
    BullGamma = require('../../index').BullGamma;
    var bullGamma = new BullGamma();
    constants = require('../../index').constants;
    console.log(constants.NB_INST_PER_SERIE);
    ConnectionsTable = require('../../index').ConnectionsTable;
    new ConnectionsTable(bullGamma);
    Debug = require('../../index').Debug;
    new Debug(bullGamma);
    Editor = require('../../index').Editor;
    new Editor(bullGamma);
    Execution = require('../../index').Execution;
    new Execution(bullGamma);
    CodeLibrary = require('../../index').CodeLibrary;
    new CodeLibrary();
  })
})

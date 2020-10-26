BullGamma = require("../../machine/bullGamma").BullGamma;
ConnectionsTable = require("../../machine/connectionsTable/connectionsTable").ConnectionsTable;
assert = require('assert');
const NB_INST_CONNEXION_ARRAY = require("../../machine/constants").NB_INST_CONNEXION_ARRAY;
const NB_HEX_VALUES_PER_INST = require("../../machine/constants").NB_HEX_VALUES_PER_INST;

describe('ConnectionsTable', function() {
  describe('#toString()', function () {
    it('should print the ConnectionsTable properly', function () {
      let bullGamma = new BullGamma();
			let table = new ConnectionsTable(bullGamma);
      console.log(table.toString())
    });
    describe("set/get instructions", function () {
      it("should set the instuctions", function () {
	      let bullGamma = new BullGamma();
				let table = new ConnectionsTable(bullGamma);
				table.setHexValue(0, 3, 10); // TO = A
				table.setHexValue(0, 2, 1); // AD = 1
				table.loadInstructions();
				inst = bullGamma.getSerie(3).getInstruction(0);
				assert.equal(inst.toString(), "a100", "returned hex value doesn't match the expected one")
				assert.equal(table.getHexCode().split("\n")[1], "a100", "returned hex value doesn't match the expected one")
				assert.equal(table.getHexCode().split("\n").length, NB_INST_CONNEXION_ARRAY + 2, "incorrect number of lines")

				table.setHexValue(1, 3, 12); // TO = A
				table.setHexValue(1, 2, 3); // AD = 1
				table.setHexValue(1, 1, 1); // OD = 1
				table.setHexValue(1, 0, 11); // OF = 1
				table.loadInstructions();
				inst = bullGamma.getSerie(3).getInstruction(0);
				assert.equal(inst.toString(), "a100", "returned hex value doesn't match the expected one")
				inst = bullGamma.getSerie(3).getInstruction(1);
				assert.equal(inst.toString(), "c31b", "returned hex value doesn't match the expected one")
				assert.equal(table.getHexCode().split("\n")[1], "a100", "returned hex value doesn't match the expected one")
				assert.equal(table.getHexCode().split("\n")[2], "c31b", "returned hex value doesn't match the expected one")
				assert.equal(table.getHexCode().split("\n").length, NB_INST_CONNEXION_ARRAY + 2, "incorrect number of lines")

				corner = table.getConnectionsTopLeft();
				assert.equal(corner[1][0][0], 0, "return corner connections for value 1 incorrect")
				assert.equal(corner[1][0][1], 2, "return corner connections for value 1 incorrect")
				assert.equal(corner[1][1][0], 1, "return corner connections for value 1 incorrect")
				assert.equal(corner[1][1][1], 1, "return corner connections for value 1 incorrect")
				assert.equal(corner[1].length, 2, "return corner connections for value 1 incorrect")
				assert.equal(corner[12][0][0], 1, "return corner connections for value 12 incorrect")
				assert.equal(corner[12][0][1], 3, "return corner connections for value 12 incorrect")
				assert.equal(corner[12].length,1, "return corner connections for value 12 incorrect")
				assert.equal(corner[5].length, 0, "return corner connections for value 5 incorrect")
				assert.equal(corner[0].length, (16 * NB_HEX_VALUES_PER_INST) - 6, "return left connections for value 0 incorrect")

				corner = table.getConnectionsBottomLeft();
				assert.equal(corner[12].length, 0, "return corner connections for value 12 incorrect")
				corner = table.getConnectionsTopRight();
				assert.equal(corner[12].length, 0, "return corner connections for value 12 incorrect")
				corner = table.getConnectionsBottomRight();
				assert.equal(corner[12].length, 0, "return corner connections for value 12 incorrect")

				table.reset();
				assert.equal(table.getConnectionsTopLeft()[0].length, 16 * NB_HEX_VALUES_PER_INST, "connections should all be 0")
      })
    });

    describe("set instructions from hex code", function () {
      it("should set the instuctions", function () {
	      let bullGamma = new BullGamma();
				let table = new ConnectionsTable(bullGamma);
				table.setInstructions("-- test\nA100\nC31B\n")

				table.loadInstructions();
				inst = bullGamma.getSerie(3).getInstruction(0);
				assert.equal(inst.toString(), "a100", "returned hex value doesn't match the expected one")
				inst = bullGamma.getSerie(3).getInstruction(1);
				assert.equal(inst.toString(), "c31b", "returned hex value doesn't match the expected one")
				assert.equal(table.getHexCode().split("\n")[1], "a100", "returned hex value doesn't match the expected one")
				assert.equal(table.getHexCode().split("\n")[2], "c31b", "returned hex value doesn't match the expected one")
				assert.equal(table.getHexCode().split("\n").length, NB_INST_CONNEXION_ARRAY + 2, "incorrect number of lines")

				corner = table.getConnectionsTopLeft();
				assert.equal(corner[1][0][0], 0, "return corner connections for value 1 incorrect")
				assert.equal(corner[1][0][1], 2, "return corner connections for value 1 incorrect")
				assert.equal(corner[1][1][0], 1, "return corner connections for value 1 incorrect")
				assert.equal(corner[1][1][1], 1, "return corner connections for value 1 incorrect")
				assert.equal(corner[1].length, 2, "return corner connections for value 1 incorrect")
				assert.equal(corner[12][0][0], 1, "return corner connections for value 12 incorrect")
				assert.equal(corner[12][0][1], 3, "return corner connections for value 12 incorrect")
				assert.equal(corner[12].length, 1, "return corner connections for value 12 incorrect")
				assert.equal(corner[5].length, 0, "return corner connections for value 5 incorrect")
				assert.equal(corner[0].length, (16 * NB_HEX_VALUES_PER_INST) - 6, "return left connections for value 0 incorrect") 

				corner = table.getConnectionsBottomLeft();
				assert.equal(corner[12].length, 0, "return corner connections for value 12 incorrect")
				corner = table.getConnectionsTopRight();
				assert.equal(corner[12].length, 0, "return corner connections for value 12 incorrect")
				corner = table.getConnectionsBottomRight();
				assert.equal(corner[12].length, 0, "return corner connections for value 12 incorrect")

				table.reset();
				assert.equal(table.getConnectionsTopLeft()[0].length, 16 * NB_HEX_VALUES_PER_INST, "connections should all be 0")
      })
    });
  });
});

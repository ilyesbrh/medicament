"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.root = exports.schema = void 0;

var _graphql = require("graphql");

var _apolloServer = require("apollo-server");

var _Model = _interopRequireDefault(require("./Model"));

/*jshint esversion: 6 */
// GraphQL schema
var schema = (0, _graphql.buildSchema)("\n    type Query {\n        medicaments: [medicament]\n    }\n    type medicament {\n        ID: String\n        DRUG_CLASS: String\n        PHARMACOLOGY_CLASS: String\n        NUM_ENREGISTREMENT: String\n        CODE: String\n        DENOMINATION_COMMUNE_INTERNATIONALE: String\n        NOM_DE_MARQUE: String\n        FORME: String\n        DOSAGE: String\n        COND: String\n        LISTE: String\n        P1: String\n        P2: String\n        OBS: String\n        LABORATOIRES_DETENTEUR_DE_LA_DECISION_DENREGISTREMENT: String\n        PAYS_DU_LABORATOIRE_DETENTEUR_DE_LA_DECISION_DENREGISTREMENT: String\n        DATE_DENREGISTREMENT_INITIAL: String\n        DATE_DENREGISTREMENT_FINAL: String\n        TYPE: String\n        STATUT: String\n        DUREE_DE_STABILITE: String\n        PRIX_PORTE_SUR_LA_DECISION_DENREGISTREMENT: String\n        REMBOURSEMENT: Boolean\n    }\n"); // Root resolver

exports.schema = schema;
var root = {
  medicaments: function medicaments() {
    return _Model.default.getMedics();
  }
};
exports.root = root;
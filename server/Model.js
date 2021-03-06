/*jshint esversion: 6 */

import mongoose, { mongo } from 'mongoose';

const Schema = new mongoose.Schema(
  {
    ID: {
      type: String,
      required: true,
      unique: true,
    },
    DRUG_CLASS: {
      type: String,
      required: false,
      default: ""
    },
    PHARMACOLOGY_CLASS: {
      type: String,
      required: false,
      default: ""
    },
    NUM_ENREGISTREMENT: {
      type: String,
      required: false,
      default: ""
    },
    CODE: {
      type: String,
      required: false,
      default: ""
    },
    DENOMINATION_COMMUNE_INTERNATIONALE: {
      type: String,
      required: false,
      default: ""
    },
    NOM_DE_MARQUE: {
      type: String,
      required: false,
      default: ""
    },
    FORME: {
      type: String,
      required: false,
      default: ""
    },
    DOSAGE: {
      type: String,
      required: false,
      default: ""
    },
    COND: {
      type: String,
      required: false,
      default: ""
    },
    LISTE: {
      type: String,
      required: false,
      default: ""
    },
    P1: {
      type: String,
      required: false,
      default: ""
    },
    P2: {
      type: String,
      required: false,
      default: ""
    },
    OBS: {
      type: String,
      required: false,
      default: ""
    },
    LABORATOIRES_DETENTEUR_DE_LA_DECISION_DENREGISTREMENT: {
      type: String,
      required: false,
      default: ""
    },
    PAYS_DU_LABORATOIRE_DETENTEUR_DE_LA_DECISION_DENREGISTREMENT: {
      type: String,
      required: false,
      default: ""
    },
    DATE_DENREGISTREMENT_INITIAL: {
      type: String,
      required: false,
      default: ""
    },
    DATE_DENREGISTREMENT_FINAL: {
      type: String,
      required: false,
      default: ""
    },
    TYPE: {
      type: String,
      required: false,
      default: ""
    },
    STATUT: {
      type: String,
      required: false,
      default: ""
    },
    DUREE_DE_STABILITE: {
      type: String,
      required: false,
      default: ""
    },
    PRIX_PORTE_SUR_LA_DECISION_DENREGISTREMENT: {
      type: String,
      required: false,
      default: ""
    },
    REMBOURSEMENT: {
      type: Boolean,
      required: false,
      default: false
    },

  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);
Schema.statics = {
  getMedics() {
    return this.find({});
  },

};


export default mongoose.model('medicaments', Schema);

/*jshint esversion: 6 */
import { buildSchema } from 'graphql';
import { start } from 'repl';
// GraphQL schema
var schema = buildSchema(`
    type Query {
        medicaments(start:Int!,end:Int!): [medicament]
        totalMedics:Int
    }
    type medicament {
        ID: String
        DRUG_CLASS: String
        PHARMACOLOGY_CLASS: String
        NUM_ENREGISTREMENT: String
        CODE: String
        DENOMINATION_COMMUNE_INTERNATIONALE: String
        NOM_DE_MARQUE: String
        FORME: String
        DOSAGE: String
        COND: String
        LISTE: String
        P1: String
        P2: String
        OBS: String
        LABORATOIRES_DETENTEUR_DE_LA_DECISION_DENREGISTREMENT: String
        PAYS_DU_LABORATOIRE_DETENTEUR_DE_LA_DECISION_DENREGISTREMENT: String
        DATE_DENREGISTREMENT_INITIAL: String
        DATE_DENREGISTREMENT_FINAL: String
        TYPE: String
        STATUT: String
        DUREE_DE_STABILITE: String
        PRIX_PORTE_SUR_LA_DECISION_DENREGISTREMENT: String
        REMBOURSEMENT: Boolean
    }
`);
// Root resolver
var root = {
    medicaments: (args) => {
        const { start, end } = args;

        return global.data.slice(start, end);
    },
    totalMedics: ()=>{
        return global.data.length;
    }

}

export { schema, root };
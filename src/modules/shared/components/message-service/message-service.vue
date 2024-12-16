<template>
  <v-dialog
    v-model="dialog"
    v-if="apiMessage"
    width="500"
    transition="dialog-top-transition"
    elevation="0"
  >
    <v-card> </v-card>
    <v-card
      class="conOfApiMessageFail"
      elevation="0"
      v-if="apiMessage.type == ErrorEnum"
    >
      <v-card-text class="v--card-txt-con">
        <div class="textErrorsMessage">
          <div class="ofOfEachError d-flex align-center">
            <div class="conIcon">
              <v-icon>mdi-close-circle</v-icon>
            </div>
            <div class="conMSG">
              <div class="headerMSG">Error</div>
              <div class="message">
                {{ apiMessage.message }}
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <v-card class="conOfApiMessageSuccess" v-else>
      <v-card-text class="v--card-txt-con">
        <div class="textSuccessMessage d-flex align-center">
          <div class="conIcon">
            <v-icon>mdi-check-circle</v-icon>
          </div>
          <div class="conMSG">
            <div class="headerMSG">Congratulations</div>
            <div class="message" v-if="apiMessage.type == AddEnum">
              You have added {{ apiMessage.res.name }} and it will expire in
              {{ apiMessage.res.expires | formatDate }}
            </div>
            <div class="message" v-else>
              {{ apiMessage }}
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
const constants = require("../../../shared/model/apiModel");
export default {
  name: "MessageServices",
  data: () => ({
    AddEnum: constants.requestType.add,
    DeleteEnum: constants.requestType.delete,
    ErrorEnum: constants.requestType.error,
  }),
  computed: {
    dialog: {
      get() {
        return this.$store.state.dialog;
      },
      set(value) {
        this.$store.commit("UPDATE_DIALOG", value);
      },
    },
    apiMessage() {
      return this.$store.getters.apiMessage;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/abstracts/variables";
.v-dialog__content {
  align-items: flex-start;
  .v-dialog {
    .v-sheet.v-card.conOfApiMessageSuccess {
      box-shadow: none;
      border-radius: 0;
      background: $color-bg-success;
      border-color: $color-success;
      .v-card__text.v--card-txt-con {
        padding: 20px;
        .textSuccessMessage {
          .conIcon {
            i {
              color: $color-success;
              font-size: 40px;
              margin-right: 12px;
            }
          }
          .conMSG {
            .headerMSG {
              color: $color-success;
              font-size: 1.1rem;
              font-weight: bold;
            }
            .message {
              color: $color-success;
              font-size: 0.9rem;
            }
          }
        }
      }
    }
    .v-sheet.v-card.conOfApiMessageFail {
      box-shadow: none;
      border-radius: 0;
      background: $color-bg-error;
      border-color: $color-error;
      .v-card__text.v--card-txt-con {
        padding: 20px;
        .textErrorsMessage {
          .ofOfEachError {
            height: 100%;
            margin-bottom: 20px;
            &:last-child {
              margin-bottom: 0;
            }
            .conIcon {
              i {
                color: $color-error;
                font-size: 40px;
                margin-right: 12px;
              }
            }
            .conMSG {
              .headerMSG {
                color: $color-error;
                font-size: 1.1rem;
                font-weight: bold;
              }
              .message {
                color: $color-error;
                font-size: 0.9rem;
              }
            }
          }
        }
      }
    }
  }
}
::v-deep {
  .v-dialog {
    border-radius: 0;
  }
}
</style>

import type { Page } from "@playwright/test";
import {
  HEADING_CONFIRM,
  HEADING_SUCCESS_MODAL,
  BUTTON_CONFIRM_RESERVATION,
  BUTTON_CLOSE_MODAL,
} from "./locator";

export const getConfirmHeading = (page: Readonly<Page>) =>
  page.getByRole("heading", { name: HEADING_CONFIRM });

export const getConfirmButton = (page: Readonly<Page>) =>
  page.getByRole("button", { name: BUTTON_CONFIRM_RESERVATION });

// 予約完了モーダルの見出し（アニメーション付き Bootstrap modal）
export const getSuccessModalTitle = (page: Readonly<Page>) =>
  page.getByRole("heading", { name: HEADING_SUCCESS_MODAL });

// 予約完了モーダルの閉じるボタン
export const getCloseButton = (page: Readonly<Page>) =>
  page.getByRole("button", { name: BUTTON_CLOSE_MODAL });

export const confirmReservation = (page: Readonly<Page>) =>
  getConfirmButton(page).click();

DROP DATABASE ev_charger_app_database;
CREATE DATABASE ev_charger_app_database;
USE ev_charger_app_database;

CREATE TABLE `users` (
	`id`	CHAR(64)	NOT NULL,
	`address_id`	CHAR(64) NULL,
	`nickname`	VARCHAR(12)	NOT NULL,
	`created_at`	INT	NOT NULL,
	`updated_at`	INT	NOT NULL,
	`deleted_at`	INT NULL
);

CREATE TABLE `addresses` (
	`id`	CHAR(64)	NOT NULL,
	`address`	VARCHAR(128)	NOT NULL,
	`created_at`	INT	NOT NULL,
	`updated_at`	INT	NOT NULL,
	`deleted_at`	INT NULL
);

CREATE TABLE `chargers` (
	`id`	CHAR(64)	NOT NULL,
	`address_id`	CHAR(64)	NOT NULL,
	`charger_type`	INT	NOT NULL,
	`location`	VARCHAR(128) NOT NULL,
	`status`	INT	NOT NULL,
	`last_status_updated_at`	INT	NOT NULL,
	`output`	INT	NOT NULL,
	`last_start_charging_timestamp`	INT	NULL,
	`last_end_charging_timestamp`	INT	NULL,
	`created_at`	INT	NOT NULL,
	`updated_at`	INT	NOT NULL,
	`deleted_at`	INT NULL
);

CREATE TABLE `fault_reports` (
	`id`	CHAR(64)	NOT NULL,
	`title`	VARCHAR(50)	NOT NULL,
	`content`	VARCHAR(256)	NOT NULL,
	`user_id`	CHAR(64)	NOT NULL,
	`charger_id`	CHAR(64)	NOT NULL,
	`created_at`	INT	NOT NULL,
	`updated_at`	INT	NOT NULL,
	`deleted_at`	INT NULL
);

CREATE TABLE `reviews` (
	`id`	CHAR(64)	NOT NULL,
	`title`	VARCHAR(50)	NOT NULL,
	`content`	VARCHAR(256)	NOT NULL,
	`user_id`	CHAR(64)	NOT NULL,
	`charger_id`	CHAR(64)	NOT NULL,
	`created_at`	INT	NOT NULL,
	`updated_at`	INT	NOT NULL,
	`deleted_at`	INT NULL
);

ALTER TABLE `users` ADD CONSTRAINT `PK_USERS` PRIMARY KEY (
	`id`
);

ALTER TABLE `addresses` ADD CONSTRAINT `PK_ADDRESSES` PRIMARY KEY (
	`id`
);

ALTER TABLE `chargers` ADD CONSTRAINT `PK_CHARGERS` PRIMARY KEY (
	`id`
);

ALTER TABLE `fault_reports` ADD CONSTRAINT `PK_FAULT_REPORTS` PRIMARY KEY (
	`id`
);

ALTER TABLE `reviews` ADD CONSTRAINT `PK_REVIEWS` PRIMARY KEY (
	`id`
);

ALTER TABLE `users` ADD CONSTRAINT `FK_addresses_TO_users_1` FOREIGN KEY (
	`address_id`
)
REFERENCES `addresses` (
	`id`
);

ALTER TABLE `chargers` ADD CONSTRAINT `FK_addresses_TO_chargers_1` FOREIGN KEY (
	`address_id`
)
REFERENCES `addresses` (
	`id`
);

ALTER TABLE `fault_reports` ADD CONSTRAINT `FK_users_TO_fault_reports_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `users` (
	`id`
);

ALTER TABLE `fault_reports` ADD CONSTRAINT `FK_chargers_TO_fault_reports_1` FOREIGN KEY (
	`charger_id`
)
REFERENCES `chargers` (
	`id`
);

ALTER TABLE `reviews` ADD CONSTRAINT `FK_users_TO_reviews_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `users` (
	`id`
);

ALTER TABLE `reviews` ADD CONSTRAINT `FK_chargers_TO_reviews_1` FOREIGN KEY (
	`charger_id`
)
REFERENCES `chargers` (
	`id`
);


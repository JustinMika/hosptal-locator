export interface UserProps {
	id?: number | null;
	pseudo: string;
	email: string;
	password: string;
	confirmPassword?: string;
	latitude?: string;
	longitude?: string;
	userType?: string;
	created_at?: string;
	createdAt: Date;
}

export interface initialFormDataUser {
	pseudo: string;
	email: string;
	numero?: string;
	password: string;
	confirmPassword: string;
}

export interface Hospital {
	_id: string;
	name: string;
	latitude: number;
	longitude: number;
}

export interface LocationMarkerProps {
	position: [number, number] | null;
	accuracy: number | null;
}

export interface RoutingMachineProps {
	position: [number, number] | null;
	hospital: Hospital | null;
}

export interface Alerte {
	id: number;
	userId: number;
	message: string;
	STATUS: string;
	createdAt: Date;
	updatedAt: Date;
	pseudo?: string;
}

export interface User {
	id?: number | null | undefined;
	pseudo?: string;
	email?: string;
	PASSWORD?: string;
	latitude?: string;
	longitude?: string;
	userType?: string;
	createdAt?: Date | string;
	updatedAt?: Date;
}

export interface Messages {
	id?: number;
	fromUserId: number;
	toUserId: number;
	message: string;
	sentAt?: number | Date | string;
	createdAt?: number | Date | string;
	updatedAt?: number | Date | string;
}

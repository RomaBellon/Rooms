import { http } from "./http";

export type RoomStatus = "available" | "booked" | "maintenance";

export interface RoomDto {
  id: string;
  code: string;
  name: string;
  capacity: number;
  equipment: string[];
  status: RoomStatus;
}

export interface RoomsResponseDto {
  items: RoomDto[];
  page: number;
  total: number;
}

// Вспомогательная функция для "перевода" данных с бэкенда на язык фронтенда
const mapRoomToDto = (room: any): RoomDto => ({
  id: room.id,
  code: room.number,        // number -> code
  name: room.name,
  capacity: room.capacity,
  equipment: room.features, // features -> equipment
  status: room.status,      // status -> status
});

export async function fetchRooms(page = 1): Promise<RoomsResponseDto> {
  // Наш бэкенд пока не поддерживает пагинацию, поэтому мы просто получаем все комнаты
  const { data } = await http.get<any[]>("/rooms"); 

  // Преобразуем каждый объект из массива с помощью нашей функции
  const items = data.map(mapRoomToDto);

  // Возвращаем данные в том формате, который ожидает компонент RoomsTable
  return {
    items,
    page,
    total: items.length, // Пока общее число равно количеству загруженных
  };
}
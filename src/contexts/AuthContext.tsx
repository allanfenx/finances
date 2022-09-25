import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { createContext, ReactNode, useState } from "react";
import { Alert } from "react-native";
import { financeApi } from "../services/financeApi";

type Chidren = {
    children: ReactNode;
}

type CostType = {
    amount: number;
    amountEarning: number;
    amountSupply: number
    amountMaintence: number;
    amountOutherExpenses: number;
}

type RevenueType = {
    id: number;
    registerId: string;
    values: number;
    optional: string;
    created_at: string;
    date: string;
    category: {
        id: number;
        title: string;
    },
}

type RevenueUpdateType = {
    id: number;
    values: number;
    optional: string;
    created_at: string;
    category: {
        title: string;
    }
}

type RevenueSaveType = {
    values: number;
    optional: string;
    created_at: string;
    category: {
        title: string;
    }
}

type SelectViewDateType = {
    select: number;
    next: number;
    day: number;
    week: number;
}

type ContextType = {
    day: number;
    week: number;
    mouth: number;
    year: number;
    user: string;
    revenues: RevenueType[];
    revenue: RevenueType;
    cost: CostType;
    select: number;
    next: number;
    enviromentSelect: string;
    updateRevenues: (data: RevenueUpdateType) => void;
    setEnviromentSelect: (data: string) => void;
    setDay: (number: number) => void;
    setWeek: (number: number) => void;
    setMouth: (number: number) => void;
    setYear: (number: number) => void;
    alredUserExist: () => void;
    logout: () => void;
    setNext: (number: number) => void;
    setSelect: (number: number) => void;
    selectViewDate: (day: number, week: number, mouth: number, year: number) => void;
    listRevenues: () => void;
    findOneRevenues: (id: number) => void;
    saveRevenues: (data: RevenueSaveType) => void;
    deleteRevenues: (id: number) => void;
}
export const authcontext = createContext({} as ContextType);


export function AuthProvider({ children }: Chidren) {

    const [user, setUser] = useState("");
    const [cost, setCost] = useState({} as CostType);
    const [revenues, setRevenues] = useState<RevenueType[]>([]);
    const [revenue, setRevenue] = useState({} as RevenueType);
    const [enviromentSelect, setEnviromentSelect] = useState("Hoje");
    const [select, setSelect] = useState(0);
    const [next, setNext] = useState(0);
    const [day, setDay] = useState(Number(format(new Date(), "dd")));
    const [week, setWeek] = useState(Number(format(new Date(), "w")))
    const [mouth, setMouth] = useState(Number(format(new Date(), "MM")))
    const [year, setYear] = useState(Number(format(new Date(), "yyyy")))



    async function alredUserExist() {
        try {
            const token = await AsyncStorage.getItem("authapi.token");

            setUser(token || null);

        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function logout() {
        try {
            await AsyncStorage.removeItem("authapi.token");

            setUser("");
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function listRevenues() {

        try {
            const { data } = await financeApi.get(`revenues?select=${select}&count=${next}`);
            const response = await financeApi.get(`cost?select=${select}&count=${next}`);

            setRevenues(data);
            setCost(response.data);

        } catch (error) {
            return Alert.alert(error.response.data);
        }
    }

    async function findOneRevenues(id: number) {

        try {
            const { data } = await financeApi.get(`revenues/${id}`);

            setRevenue(data);
        } catch (error) {
            return Alert.alert(error.response.data);
        }
    }

    async function saveRevenues({ category, optional, created_at, values }: RevenueSaveType) {

        try {
            const { data } = await financeApi.post("revenues", { category, optional, created_at, values });

            listRevenues();
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function updateRevenues({ id, category, optional, created_at, values }: RevenueUpdateType) {

        try {
            const { data } = await financeApi.put(`revenues/${id}`, { category, optional, created_at, values });

            listRevenues();
        } catch (error) {
            return Alert.alert(error.response.data);
        }
    }

    async function deleteRevenues(id: number) {

        try {
            await financeApi.delete(`revenues/${id}`);

            listRevenues();
        } catch (error) {
            console.log(error.response.data);
        }
    }


    function selectViewDate(day: number, week: number, mouth: number, year: number) {
        setDay(day);
        setWeek(week);
        setMouth(mouth);
        setYear(year)
    }

    return (
        <authcontext.Provider value={{
            select, next, selectViewDate,
            alredUserExist, user, logout,
            listRevenues, revenues, cost,
            saveRevenues, deleteRevenues,
            day, week, mouth, year,
            setNext, setSelect, setDay,
            setWeek, setMouth, setYear,
            setEnviromentSelect, enviromentSelect,
            findOneRevenues, revenue, updateRevenues
        }}>
            {children}
        </authcontext.Provider>
    )
}
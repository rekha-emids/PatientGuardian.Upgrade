export let navigation = [{
    actions: {
        dismiss: jest.fn(),
        goBack: jest.fn(),
        navigate: jest.fn(),
        pop: jest.fn(),
        popToTop: jest.fn(),
        push: jest.fn(),
        replace: jest.fn(),
        reset: jest.fn(),
        setParams: jest.fn()
    },
    addListener: () => { },
    dangerouslyGetParent: () => { },
    dismiss: () => { },
    dispatch: () => { },
    getChildNavigation: () => { },
    getParam: () => { },
    getScreenProps: () => { },
    goBack: () => { },
    isFocused: () => { },
    navigate: () => { },
    pop: () => { },
    popToTop: () => { },
    push: () => { },
    replace: () => { },
    reset: () => { },
    router: undefined,
    setParams: () => { },
    state: {
        key: "id-1558778781349-4",
        params: {
            id: 1022,
            userType: "I",
            imageData: {
                image: "data:image/jpeg;base64,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",
                imageByte: null,
                patientId: 1022,
                rowVersionId: "AAAAAABtwWc=",
                thumbnailImage: null,
                thumbnailImageByte: null
            },
            personalDetails: {
                addresses: [
                    {
                        addressId: 76,
                        addressTypeId: null,
                        city: "WAIMANALO",
                        isActive: true,
                        isPrimaryAddress: true,
                        patientId: 1022,
                        rowVersionId: null,
                        state: { id: 11, name: "Hawaii" },
                        stateId: 0,
                        stateName: null,
                        street: "1271Ranugad Street",
                        zip: 96795
                    },
                    {
                        addressId: 236,
                        addressTypeId: "Work",
                        city: "St. Louis",
                        isActive: true,
                        isPrimaryAddress: false,
                        patientId: 1022,
                        rowVersionId: null,
                        state: { id: 25, name: "Missouri" },
                        stateId: 0,
                        stateName: null,
                        street: "510 Maryville University",
                        zip: 63141
                    },
                    {
                        addressId: 242,
                        addressTypeId: "Flat",
                        city: "Las vegas",
                        isActive: true,
                        isPrimaryAddress: false,
                        patientId: 1022,
                        rowVersionId: null,
                        state: { id: 2, name: "Alaska" },
                        stateId: 0,
                        stateName: null,
                        street: "Redline cross",
                        zip: 96001
                    },
                    {
                        addressId: 244,
                        addressTypeId: "Home",
                        city: "St. Louis",
                        isActive: true,
                        isPrimaryAddress: false,
                        patientId: 1022,
                        rowVersionId: null,
                        state: { id: 25, name: "Missouri" },
                        stateId: 0,
                        stateName: null,
                        street: "510 Maryville University",
                        zip: 63141
                    },
                    {
                        addressId: 266,
                        addressTypeId: "",
                        city: "St. Louis",
                        isActive: true,
                        isPrimaryAddress: false,
                        patientId: 1022,
                        rowVersionId: null,
                        state: { id: 25, name: "Missouri" },
                        stateId: 0,
                        stateName: null,
                        street: "510 Maryville University ",
                        zip: 63141
                    },
                    {
                        addressId: 275,
                        addressTypeId: "",
                        city: "Honolulu",
                        isActive: true,
                        isPrimaryAddress: false,
                        patientId: 1022,
                        rowVersionId: null,
                        state: { id: 2, name: "Alaska" },
                        stateId: 0,
                        stateName: null,
                        street: "41-1330 Kalanianaole Hwy",
                        zip: 96734
                    },
                    {
                        addressId: 276,
                        addressTypeId: "Home",
                        city: "Los Angeles",
                        isActive: true,
                        isPrimaryAddress: false,
                        patientId: 1022,
                        rowVersionId: null,
                        state: { id: 5, name: "California" },
                        stateId: 0,
                        stateName: null,
                        street: "Hill street",
                        zip: 60018
                    }
                ],
                age: 38,
                description: "am AN individual",
                firstName: "lori",
                gender: { id: 6, genderName: "Male" },
                isActive: false,
                lastName: "Whitfoot",
                patientId: 1022,
                phoneNumber: "6666666666",
                rowversionId: null
            }
        },
        routeName: "EditClinicalCondition"
    }
},
{
    actions: {
        dismiss: jest.fn(),
        goBack: jest.fn(),
        navigate: jest.fn(),
        pop: jest.fn(),
        popToTop: jest.fn(),
        push: jest.fn(),
        replace: jest.fn(),
        reset: jest.fn(),
        setParams: jest.fn()
    },
    addListener: () => { },
    dangerouslyGetParent: () => { },
    dismiss: () => { },
    dispatch: () => { },
    getChildNavigation: () => { },
    getParam: () => { },
    getScreenProps: () => { },
    goBack: () => { },
    isFocused: () => { },
    navigate: () => { },
    pop: () => { },
    popToTop: () => { },
    push: () => { },
    replace: () => { },
    reset: () => { },
    router: undefined,
    setParams: () => { },
    state: {}
}
]


export let userState = {
    authData: {
        access_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA2RDNFNDZFOTEwNzNDNUQ0QkMyQzk5ODNCRTlGRjQ0OENGNjQwRDQiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJCdFBrYnBFSFBGMUx3c21ZTy1uX1JJejJRTlEifQ.eyJuYmYiOjE1NTc5MTE5NjAsImV4cCI6MTU2MDUwMzk2MCwiaXNzIjoiaHR0cHM6Ly9wZnRlc3Qtb2F1dGgtYXBpLmNvcmVvZmxvd3NhbmRib3guY29tIiwiYXVkIjpbImh0dHBzOi8vcGZ0ZXN0LW9hdXRoLWFwaS5jb3Jlb2Zsb3dzYW5kYm94LmNvbS9yZXNvdXJjZXMiLCJhcGkxIl0sImNsaWVudF9pZCI6InJvY2xpZW50Iiwic3ViIjoiTG9yaS5XaGl0Zm9vdEBtYWlsaW5hdG9yLmNvbSIsImF1dGhfdGltZSI6MTU1NzkxMTk2MCwiaWRwIjoibG9jYWwiLCJ1c2VybmFtZSI6IkxvcmkuV2hpdGZvb3RAbWFpbGluYXRvci5jb20iLCJlbWFpbCI6IkxvcmkuV2hpdGZvb3RAbWFpbGluYXRvci5jb20iLCJ1c2VyaWQiOiIxMTgiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiSXNFdWxhVXBkYXRlZCI6IlRydWUiLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiYXBpMSJdLCJhbXIiOlsicGFzc3dvcmQiXX0.YKFlV37He0ciYBBgIjSpJkd8LOJ98fF_YJzy2Hef2DJT0bmVfvLYsoBrT8DpKZOg8AjQJW5VBLoL0WB07FC1llNuZ-fDcMyG-0rAl87owU4gtUfWShF1xLHFI865XDTFQ-e8WpR2Wf4KEqMeIA6pHS81JJryOQ62iTcKIGqPNJtuZgur8udfkJ32rOOoeB7LfMkpyIUm2gUpq5PGK0-tCtXMYomIqQCZjpq6TpKCZ2R514Jswp95zj1I1MPSaKaeTcraO0OwNX1N-pgxAxrhji6ziMEVHEadeLeq0a6Qcg6KLltnpaxKYcZfzq02rHowHSkpGXlTi0rIBfdXMSu2dA",
        expires_in: 2592000,
        token_type: "Bearer"
    },
    autoLogoutTime: 1800000,
    careTeamId: 0,
    emailId: "Lori.whitfoot@mailinator.com",
    getPatientImageStatus: 200,
    impersinated: false,
    individualList: [],
    isUserMapped: true,
    lastViewedUserId: 1022,
    lastViewedUserType: "I",
    onBoardRelationShip: null,
    onBoardUserId: 0,
    patientId: 1022,
    patientImage: {
        image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCADIAMgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDnWmMrbnHJrHhuVgvnDDvVy1kd4eeorIJzqhzzzWhtUXuo6eOTzIg3YiqqHr9asRYFvgDtVX+Lj1qWbw2Q9ckgL97NXJBewsrtH8uOKqwxSzPiEZateL7TFFskdnx/CRU3sZ1kcu8huNWJZSDU10vzJgZNX49Du7i/aWKBmye44reg8KRXEiRySsJD12D7tDd9gptLc5uz/dt+9jJTFW5oQE86OMiPuK9K0X4eQrkzzNMB03Cpdd8FrGgaDaVYYcDtUq5cqkTyUsrnIBwela2iF1un8rg45rRh8F3NxcOITF5SnAYk1NB4Z1TT7veih1HTbWkboyqtSic/rmmvHYXE8iYGaytMiRLVWB6810niZphpUyzK3mE/drndPWT7PGnlndjpTlLoZ0VZlp+2DUF5GZbcrjmrUsbIQrrg9ajO7oOeamJ1SWhBDoPmwhwxDYrLi82DUmgJyFOK7u1RWtlATnHNceMJrFxnHWtr6HBFfvC8wGQSeabLHmFsmjhuRSkErjrWPU7+X3TG2xb252nPWpI2dWAS4BX0rufCnhmyv7OWSZN7MxGPSuS8S6N/ZfiIW0AITOcVomrHDqplkH90CeWPWl3iNCzDtTQdpAPUChiCpJxjFRpc7NUrkUepWpyDxRVCOKR1dhbErnqBRVqxxSqtMtWxJjz0rJkfy9Q3cHBpDfv9yPJp8dnJK4d+pqrI0cuaOhsRajG0WwBi54wKmtUedgCCCT0xzT9F0SKS4V5ZgvcZ7f8A1q9F0q3062j+zx2y3NyO5rGbS2NqbaWpz9l4f1OVVMNv5aDku/BNd5o/hIyxwy3jBlA9K2tG0mC1ja5cFdw5VmJAqjrmvfN9mtdyqvGQPvGs00xTlcnlt9K0ksc+YR/yzUDFWNFurG7DG3s0Rs9QMisyy0R72IT3cu3u2fSti2udP0yApGqxwr1Y9/ehzhElRbNZ5o7aMmd0QH8Kzpr/AE9IHAmR1frzXH+I/GOnSgwxv5oHoa5SLVPMf5d20muGWKknodNPDcy1PQW061lZWs5GCMeQPWta00e2ZcDJx71x2m3mI9nmFFIzn3q7F4il0+VRI26Pu1VHGS6hPC6aGlrPhiC6iZGiVlPfvXF3vgp7aJjEQMc7vauzk8QWt2glt518zum6pYrhLlQJApB4IBzQsVeREaLgeO3enz2xJw0oHUjkVnSqyr8iMBnqK9o1LwzBeW0j2pCPj7teValptxaXEltc/IUPfgGuuNS7HfQpW0sy5KTdumelc/DKZdXlDnLZ61akK/b2jjmYsByOgqooEepZHJ711PY418ZrKODg0oz0NRbj19akBYDGM1gdy2O88D3EcdlLG8gQ7gR+dc348dG8WQtGQQU5rZ8EwQzW9yZBls9z0rifExKeLGXcxUDiqS0OWVuckY7mJJoUhuDyBTAeSc9RQhww568VPU6uh6L4W0i3utDDmIZJ9KKqeEdYFrpTI8TsFPaitEcM4rmPI7TaJwPbHNa8MySERO+xs4BrP06GNnVpHwM9hmtKxWx+17vKbcG4Yt/Sm3c1glGJ6BoOlS7FEMSSZwHLnpXo2l6faafIsswj+0PhQi81g+EYJbvbJPNGF4wFAGRXeJawxsSEXHqRk1zzVmPmuQ6lg6fJwcYzgcVyGk2b3urJLh1SMHPmLgH0xXRarqrQIyQwebNj5VPSs6zu7swg3mxZHOQiD7orknVsaRptl7Ub+Cws5CWGEBLV4zr/AIwl1W4aFCRHuIVV44rsPHeobNFuDATuPDV5j4YsxPceZN8xzxWSnfVm9OBrabo9zfSAlSiHua6/T/DggZd75FXbCJEjCkAYrTDAdBSTi2dDfLsQ/Y40wAM4qhf2wKEAcela7dOKglj3LgiiUF0BTfU4LUjd6bIZLYkH6V0/hrVzLBGXOCwwSfWm6jZCSHBAJIrH0oPBmLptOQKzskVJJo9XsroEeXuBbHX1rF8U6DDq9o80UW64QfnRpFxvjUn71bPmEbj0J+7it6NQ4ZxsfPd3pV3ZX0skkLNJyMYxWf8AZLiKfzpU257V7V4lsUlt5pWjVJgpIavJrgySTEO4Yr6d69CE7owjFXuQK2BkN+GKlEr7exqJ0K8sCCfakDEDApnTbQH1e709j9nkZN3XHesye7mvb1ZpjlzxmrcyCUjcelRG0DMrA9KtbHPOHvF4DKZHpTUkOACOnelVsDaOgFMY/IQBUX1NVsb2j6ybKFo1TcG6jFFc1BeS2s/AyKKtM5J35itYRNsXbjO7vV63sW+0ruljBJ6bhVe2VDAqltuTw3oa3tO0BpNRhnlAeMkFcH7x9MUSdmbRjeNj1XwvZEWdrLkg46Doa7OWUKgOTkjAFYvhyJ4rOMGDaEHyjPSrt3cAy7cgE1w4ipbYcImBqt3L9uMURO5eWI7e1MMhhtyWYlwNxJp89sTcl42+c8uT39KytXndLLyycPhiT7V57lc7YRMnVpF1C0eE/wDLXNc5oFuLeZ4gMMrEc1qo5+yK/dWHNNk8q2v1uBgIw5H/ANaiEuhtyWOotR0b1FX4wOtYEOqHyyLe2eQev3a0rG9FxFkqUbOMGt1ZEyszRHXB6YqC6u4raAySGnbs4FZ2pNbmNvOPyrzWkZJ6GfLYVr1LgDbauAe9Yd0ostUjkcERs2DxWff+Lr2CIy21m/kg7Qxq7p2pvr+nyx3cXlygZQkd6mcNBxkdRp8zWkyg/dyOfrXURP2YDJHykV5/ot8bxXsbg7LqEcKTy49a6ezvJLcrDPkqOjVzr3WRUjcua9pDXmmSxLJ87qVBryt/AepQF97kq3PmAcKBXtto9vcIBncRU135SWTqkAkA5216VGSaOKV0z52v9JuYlLmOR4xhVfHXHes5sx8OCrdPu11vinWJ57uWBz5Tg4ARNqgdq5GSRpH+dyxHeug2i9CjLeLFLgqTj2pBfwZ5DCm3EUj3GyJNzdaq3Bkh/wBbCB61okc9SrZmnFIki5QmpcgJ05qrZsHhBAxVoqQuRzUOOpvB3VyMIpPbNFZ8nE53SlaKtLQ5Zzsy3aZ8pMKHZT0rudC06KW+hm+27G4Kx54zWH4f0AXmj3MqyB2iO7jritfSdGvLbVLZpzsVWDInqPSs62rNqTvHU9hsVFpYLG8gdiPvE9agaJPP82XAHXrQIGk8tiMJgcVUvLoAsny8DA4ryK8nc6YRKl9qKbzFEu3B61y+pytO0hzkYxWgPPuJpDkAYNZOpOIY9i8sSM1ytnVGNincAxWBA6YBqxAkLrFLMAWVAcnpUN4N8KDH3h0pL75LWO1HVkH4VrTdjSSG3fieTy5hYRF1jBDMF4FVtE8VT3eIpISjYznFWdPsVtLQxea2x/vJng1ettOiGDHGAB04rq5lYx5DX028MxAc5zVXWbCW53xoTgmp7WAxMBxWwY1dQQQWxThFCdzjobBoohDcRyNHnO3dmti0togoEcYCt7dKvFlikw8eMd6mRl6hRtPpTb6Cscl4rtX06a01u2bZJEwWXHda6Kw1NL+2ikOCpGc1X8Vwrc+HL4BQT5ZxWB4RdzpsSEngYxXPWWmhSV9z0nSpULhlfGDyK6PejRhTgg9hXEWBHnYGVI5yO9dNaylSCOWIwKVGq07HLWhZnnnxBuY7SYpDBbkuDuLJk15iSfvEAZ54GK7z4hW+3VzK05D45U8iuGkO6QHI9sV60XdXJiizo9ubjVVCj5sdKi8V2X2dyGIBJptjfyaff+eg3HGM1S12/kvZDJMDljxWquc1VLmGW6eXEoFTlyowBUMLfuVqQHvSkdEPhK62f2mfk0VbhcJJmitFscs0rnS+AbyDRb4I0nmQz/K4616aPDbXWrLdwPI9vkFOfuivH9B1TTLCFY7fZgnIMvODXonhzxTem9WyFwkkR5ymeK55m0VaJ6ANMEWHeVzgdzXO6z5UYfbIFPbiulguVvIld1IDdzXPa5ErTEI21R1b0rzcQjei3c5azuREXMnO7IFZ8m65vMn7iZq7dyWq3Li3dpJMYB7Zqu8LQQhMgyMcsa4HLU9OK0IQpmukyeFNKwWW8YsM7eBUtpGfPcEdBxUdoP8ASXDj+KtaYMv21kjYYjPtWiFVI8IMURIAgPSmSkt0zj1roTIYyN41JkeUZzjFXftCeRvQ4J6c1jzJn5iSPQetQL5jMOGK+lWnYTSNR55Jl/eYNLDP5XX7mcGolju44XkZPLRF3MW7Vj6Xql1qkMsj2oihDbVP973qmTdG/rPzaRcr2aM1yvh4tHZ7xwFPFdLqZ8vR5tx5KYrnrHbbw28R4D5z+dYTdykkdjYSh1ST861/tRW3kUNhh904rndPzGxUng9K6G2JlRohjjHNKEfeOWtY878VCZbTz72MGZmPLdx2rhHkVyHA49q9U+IKCOxRBAbiXjbgdK8kuLkxTN5gw3Rv8K9emtDn50hJX2Esp/8ArVQuLl5lCORxViS5idCo+U9s1WVQqNlgSelb20Oeck2W7bmOps44qrbyKI8FsVMGQ8bx9amxvGSsT2qGWRgAaK3dA0O4upUlgmXyz1z2orlniOV2MJSjc4i2QGZRgdele6fD7w3FNpwlLbJPUeteIWQPm7sYKnIzX0L8OdSW60JY2wsq/rW09DSN7HavB5cIQYVAO1cprpG1kQHPrXXXG5o8AZOOa5TUonZySeR2rzMSb0HqcpFEsLtI2WOOAfWmbCIw7D5yT+tajW2wkuOBzVJlLzGXnaoOB2xXnbs9FPQpT3EdjGpc/wCsyM+lM3IlxEAeHGRXPeJNT826W3i9Rn2qp4g1k6cNJkD/ALxeGHtxXXTg3sQ52Z6Uj/ulIHUVka1JqS2hi08p5nX95VjSNRi1OySeFgQwx9DVu5iVsA8kd6qKcXqO99jmNI124gbydWspGcf8tEHFdFHrsJi229gd/YsOKRYoZj5U+0r2p/8AZ9svBbCjoK2VtwZDcXV5qh8ucqI3GGVOjfWrC2kcEcUUaAKgwAKni+zwKdi8ik3bi0hPTtV30MmtTO1+b/QDGTy5wK53VHKeUiH5gARWhrFwZb6JP4Y+TWTrDLuTedmeQ1czV2XsjqtEvkubdC/3h8prsdNZBJgcg15lolziUchZB/D6j1r0HS7kYUlNtNOzMZxurmnq+nLdWsgjTbIwwpFeD+LPCl/pjtJNETCzbgx65r6I+zvcquHwpBzXn/j+0jtNLeJDJK3Viegr0aczhcdbHhTQybuRTTGw52j0rRuJCnOzqOKrfbFPBSutPQzlAqeWybgetPhhllwI42YmrccyuSdgrptFthYQtfSgD+4vrWdSdlsJxdi/p+n3mlaXFbK5FxL8zc/dFFVVvrqbzLx3JjP3KK8id3K5zOLuZvhyy8yHdNew2yn7pk6E+legeGr/AE7SpVD6zDLKT92MivMLJNunby+7B71Lpjyf2oghiWSTOSR2FevUO+m/dPp62u47iEOkiurDrmsnUMKzHANZnh3UQ9jEGjGFGDg96v3rA/vNvHpmvLxKNaa1Ofu5nLEMMCsW9uX2lc4XBxite4l8xmDgjriufuL2AP5YXdg158Y6nowtYx109JJDPOOhwK4bxXM8+rNuBCRgKv4V3WpXEhtn2jbg7hXO32nLqixzRfMf4h3zXbRfLuZ1Y32JfAupTWTCJnPluc89q9QjnWeNSPSvKC66ZNGuzoACR0FdppWpFlUFugq6kX8RVNK1jpDGcEjimlTn5qIbjeBVg4ftWSl0LasMG0CmTsFiITqak2YqCYA1blcmxhzRfvWZ+SaydYiV7RA3QfKwPcnpXQXgyMjqKytRjXUdHuY4uZ4z8wXr0pLcU1oc9aXk9qAM7mj4Kd/aux8O67cyXMIMUhjZtp46Vw8DGYpFNxKvy5Xv7H3r13w3YW+j6RFLJDvdhkA9a6IUuZmbfu2R24gdrUfZ5SrlcjNecePr+9gtGtbi2ZQwwZAOD+Nd7Z6zGwUtEVB44q9c21nq9s0NwiyxsOhHSu32XKjz5KcHqj5cNo8zLEgJJOBVK70a7tZSrAjPtX0BcfCrTjKJba4eNg24DHFYmt/D7UzcloPLlQ4AyeapaIxnNnl2l+Hbq7i/doWPeuo0/wAN3kM0JvXDQqf9V/WumfStU0Cw8u3sHeU/eZVyBWe2oNwshJkI+YNxg159aVVsn2jSJ77SrV/LieNUh6/LRVXUbjyYVQZKuPvA5Iorl5JmLmzzbSXEtokLr8mck+lXNS1aO3BhsAsW0fNIOprnbW5lWJYQ/wAu7JxxVi7yYyCBtNe5NXZ1037p7L8Or9J9CWPfvkHDZ612EkEksLNnGa8S8DapPp10GiwY3+8Cegr1s+KbVIFdcOrYBGehrhxFK5vTlYoagCPm7Djj1rmWsizPxhmJau8ubeK7to5kA2tzgetc7ewi2m3DlgRu9vavOlBxZ3QldHNGM3FpcROMMASPwrL062kMaxRg+YzY2DrXS6lbtbzRmIZNwQxbso7irFmlvpGl3mu3CgCPKxA9m7Gt6Uecpy5dWRzeFYJ7B7V2SO4lTIRj82RXMacslk7WdxkSQnH1pNC1i41bV11GaVmmWQFhnoCeBiun8Y6QYNSi1KBcJMB5uP4TXVKF1YiErO4+ymO1QT04rZifIArnLMnqOcnNa0Mpx6Vx8lmdD1VzQLioJDmm+YCKYz8YotqZFO8+bp0rGnhuI5POtXCT9vQj3rblGPrUdvZvczrEgyzHn2q4xuxSloU9B0+41q6MktksXlHc8mOGIr0aaJPJhQAfKOlTafp8VjYrEgCjGW9zUhQZ4616NGNjl57MpquDjtVy2leGTKE0qW/c09oiB6V0XCU1LRm1aXRlHzCrQw3esGyLRSDJPNbajjNS0cVSKT0HlVbggEd81j6j4d03UY3ElsmW/jQYIrXBIUmq4nwGyeQaXLcztc83u/hzcwTPIlyZoAeIz1FFelRShmOe9FZOiieQ+MbdWypHHNXJ90vANSWNiWuow/K5rrYNNte0QIHc10No2hsc7pSTxBljR9x9O9dFG14liImjZeck4rXsLENMFghJZugUV2+leBZ70B70mKH+6OpqJJMrmsYXg7xDNtOnXcbyMf8AVsFziug1XT5BCsrrsBILE+3Suus9F0zRbcGKBAwH32HNc5qZn1S62EkQKc4z1rmqUUzalVZxep3YUbFHQgHPvXO/EnWx9lstDtzjbGskwB656V0vjCxlEttNDHthilRpSPQGvMPFXlXfiS5nglLxuAVPoPSohBQNpzctBvh2+/s7Ukcj92xHmCvfbR7TWNLjDFWjdBkZ6jtXzrGuxsgdOp9a9F8Ea75YFlLJjB3Rk9varvcetje1DSZdMuMJnyScr9PSiM5rqzJBqFsI7kYDD5W9DXO3Fm9jM0Uo6fdI/irCpDsawqaWZFkjrSFs9TjFK3zdKYF+YBulYWNOg/bu+vat7w5ZhXe7YfKPXvWTZ2z3FwsK8tnj6V1giEMSW8X3V6100ad3c5qkuhL5vmnj7ucip4oy3JpsUAOFHarart4rvWhyykKAAKaRnrUu3ikC0GbkwjTnOOlaUD71xVFQQOKu22AhJoIY+4bZEQKod6nnk3nFVx0OaEKwobaeKKQH0op2HY+ctO0HUpJFItmBHTNdnpXhDUbuaOJxsU/ePpW9BLKq9B7YFdxoNq9vZebKcu/P0q5WRlFsZoXhm00eBfkWSUfxkVtHAXJNIrhiR6VVu5/l2qayZauyhqkxkO0cis6KEKrE96uSKWbNKYxtxUtG6djIurNLiBo3XcjDBB714x4q8Nto2pMoQ+TKSyn+le8lMdqxfEWgxa1p7wSD5wMo3oaicdDSE9dTwERAZx2qW3d7eUMhxzmr99YPaXLxSIUZCVI9T61VEROMiufVHSmmer+GtWTVdM+cjzYxhh6+9bieVcxrFcJu7I/cGvJdC1GTSr5ZAxCZ+Yeor12zaG8s457f7kigg/3a0TUiJPlMfUNOktWyP9WT9/FVBGOMnmuy8rzYPKlG5DwK5u6sWtrwQsD8x+U/0rOVPXQqNXQ1fD1niI3LD584X6VsLF85PdqfaRJBaJHjBUVYCAH9a66aSRzVJ3Y1V2rwOacKcelIBxVmTdxc9qeopoFPxxQSOBABoVyARmqzs4fFPzjrQOxID3pjcGgGkc8ZpoLD1Hy5opM4joqhWOM8O20l0bZZBljy1egyMsUYjXjArj/AZaaGa5ZNqr8q5rpJJC7N61L1IjEnDNJwvHvUE2AxFSwN8pUN81QsjBm3daktaEIXmkfk1LjHWmHk0DIiKQrlfxqUr3pmD1pDOG8b+GReQNfW6DzEA3AD71eWNH5cjKcjHXNfRbIrqQed3BBryrxv4aNjdfa4UzE/OAO9ZTgb0pnEE7hjsa7LwR4lNldfYLs5t3PBPQVxe1g+DznjHpUiFom3gn5ehrBOzN5e8j6FVEKjacg9/wDCh7SOaRHlUFkPFcT4I8Vmfbp92cuo/dOa70ttDcZ5+auqEkzlknEkKqcYx0xQTTQO3elGaszavqL3petAGRS4xTJHCjNNJozQAMO9M+tSDmmEc0DQClbmOmnNKPu0DEydmKKB6UUwKmgQfYvDtuCfmk+Y1eXoSe9FFQJCI5Vtw7VeKi4hBX71FFMJFZo3ThhUYTvRRQShD6Uw0UUFCH/Z61Wv7GHULVrSRQVkHyk9jRRRLYUXqeL69okmlahJC/Zjj6VkH+JTwKKK4pndSH2tzJayo8bbSDkEV7J4Z8QJrGnqv/LeNcEetFFVTCokdCXAZW6ZGCKeo4oorrRxy0HdqTOaKKZAnJpQDRRQMXpQTRRQCGmkFFFIoaD81FFFUB//2Q==",
        imageByte: null,
        patientId: 1022,
        rowVersionId: "AAAAAABhgkI=",
        thumbnailImage: null,
        thumbnailImageByte: null
    },
    patientName: {},
    relationshipName: "Self",
    roles: {
        "Async_Messages": { Create: true, Update: true, Read: true },
        "Dashboard": { Read: true },
        "Login": { Create: true, Update: true, Read: true },
        "Manage_Connections": { Create: true, Update: true, Read: true, Delete: true },
        "Payment_Processing": { Create: true, Update: true, Read: true, Delete: true },
        "Profile": { Create: true, Update: true, Read: true, Delete: true },
        "Search": { Create: true, Update: true, Read: true, Delete: true },
        "Service_Request": { Create: true, Update: true, Read: true, Delete: true },
        "Telehealth": { Create: true, Update: true, Read: true },
        "Visit_History": { Read: true },
        "Visit_Processing": { Read: true }
    },
    selectedPatientInfo: {},
    userEmail: "Lori.whitfoot@mailinator.com",
    userId: 118,
    userInfo: {
        careTeamId: 0,
        coreoHomeUserId: 118,
        email: "Lori.whitfoot@mailinator.com",
        emailId: "Lori.whitfoot@mailinator.com",
        isUserMapped: true,
        lastViewedUserId: 1022,
        lastViewedUserType: "I",
        onBoardRelationShip: null,
        onBoardUserId: 0,
        patientId: 1022,
        relationshipName: "Self",
        userId: 118,
        userType: "I"
    },
    userType: "I"
}

export let DashboardState = {
    dashboardState: {
        lookupDetails: {
            days: [
                { id: 24, name: "Monday" },
                { id: 25, name: "Tuesday" },
                { id: 26, name: "Wednesday" },
                { id: 27, name: "Thursday" },
                { id: 28, name: "Friday" },
                { id: 29, name: "Saturday" },
                { id: 30, name: "Sunday" }
            ],
            gender: [
                { id: 6, name: "Male" },
                { id: 7, name: "Female" },
                { id: 8, name: "Not Disclosed" }
            ],
            language: [
                { id: 6, name: "Chinese" },
                { id: 7, name: "Chuukese" },
                { id: 1, name: "English" },
                { id: 3, name: "Filipino" },
                { id: 10, name: "French" },
                { id: 8, name: "Hawaiian" },
                { id: 5, name: "Japanese" },
                { id: 4, name: "Korean" },
                { id: 9, name: "Marshallese" },
                { id: 2, name: "Spanish" }
            ],
            recurringPattern: [
                { id: 17, name: "Weekly" },
                { id: 18, name: "Bi-Weekly" },
                { id: 19, name: "Monthly" },
                { id: 20, name: "Bi-Monthly" }
            ],
            scehduleType: [
                { id: 31, name: "OneTime" },
                { id: 32, name: "Recurring" }
            ],
            serviceRequestStatus: [
                { id: 35, name: "Open" },
                { id: 36, name: "Invited" },
                { id: 37, name: "Applied" },
                { id: 38, name: "Hired" },
                { id: 39, name: "Not Hired" },
                { id: 40, name: "InProgress" },
                { id: 41, name: "Completed" },
                { id: 42, name: "Closed" },
                { id: 47, name: "Cancelled" },
                { id: 58, name: "Not Interested" },
                { id: 106, name: "Pending Approval" },
                { id: 107, name: "Declined" }
            ],
            skill: [
                { id: 1, name: "Arthritis" },
                { id: 2, name: "Bathing" },
                { id: 3, name: "Companionship" },
                { id: 4, name: "Continence" },
                { id: 5, name: "Depression" },
                { id: 6, name: "Food Prep" },
                { id: 7, name: "General Transportation" },
                { id: 8, name: "Hearing Disorder" },
                { id: 9, name: "Home Health Care" },
                { id: 11, name: "House Keeping" },
                { id: 10, name: "Senior Care" }
            ],
            slot: [
                { id: 21, name: "Morning" },
                { id: 22, name: "Afternoon" },
                { id: 23, name: "Evening" }
            ],
            state: [
                { id: 1, name: "Alabama" },
                { id: 2, name: "Alaska" },
                { id: 3, name: "Arizona" },
                { id: 4, name: "Arkansas" },
                { id: 5, name: "California" },
                { id: 6, name: "Colorado" },
                { id: 7, name: "Connecticut" },
                { id: 8, name: "Delaware" },
                { id: 9, name: "Florida" },
                { id: 10, name: "Georgia" },
                { id: 11, name: "Hawaii" },
                { id: 12, name: "Idaho" },
                { id: 13, name: "Illinois" },
                { id: 14, name: "Indiana" },
                { id: 15, name: "Iowa" },
                { id: 16, name: "Kansas" },
                { id: 17, name: "Kentucky" },
                { id: 18, name: "Louisiana" },
                { id: 19, name: "Maine" },
                { id: 20, name: "Maryland" },
                { id: 21, name: "Massachusetts" },
                { id: 22, name: "Michigan" },
                { id: 23, name: "Minnesota" },
                { id: 24, name: "Mississippi" },
                { id: 25, name: "Missouri" },
                { id: 26, name: "Montana" },
                { id: 27, name: "Nebraska" },
                { id: 28, name: "Nevada" },
                { id: 29, name: "New Hampshire" },
                { id: 30, name: "New Jersey " },
                { id: 31, name: "New Mexico" },
                { id: 32, name: "New York" },
                { id: 0, name: "No State" },
                { id: 33, name: "North Carolina" },
                { id: 34, name: "North Dakota " },
                { id: 35, name: "Ohio" },
                { id: 36, name: "Oklahoma" },
                { id: 37, name: "Oregon" },
                { id: 38, name: "Pennsylvania" },
                { id: 39, name: "Rhode Island" },
                { id: 40, name: "South Carolina" },
                { id: 41, name: "South Dakota" },
                { id: 42, name: "Tennessee" },
                { id: 43, name: "Texas" },
                { id: 44, name: "Utah" },
                { id: 45, name: "Vermont" },
                { id: 46, name: "Virginia" },
                { id: 47, name: "Washington" },
                { id: 48, name: "West Virginia" },
                { id: 49, name: "Wisconsin" },
                { id: 50, name: "Wyoming" }
            ]
        }
    }
}

export let EditPersonalDetailsFormState = {
    initial: {
        "age": "38",
        "description": "am AN individual",
        "first name": "lori",
        "gender": 6,
        "image": "data:image/jpeg;base64,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",
        "last name": "Whitfoot"
    },
    registeredFields: {
        "age": { name: "age", type: "Field", count: 1 },
        "description": { name: "description", type: "Field", count: 1 },
        "first name": { name: "first name", type: "Field", count: 1 },
        "gender": { name: "gender", type: "Field", count: 1 },
        "image": { name: "image", type: "Field", count: 1 },
        "last name": { name: "last name", type: "Field", count: 1 },
        "phone number": { name: "phone number", type: "Field", count: 1 }
    },
    values: {

        "age": "38",
        "description": "am AN individual",
        "first name": "lori",
        "gender": 6,
        "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCACWAJYDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDmM/vXpM8kDr2pH+8cU5VZ2wgy3pTZ3rYtFbtYUYJlBWTqtw008aOhGK6G1+1wptkchT/CRWdf6fNe3iPHExPoBS5jla94qzIBb4IptsrqVOwkZ5robfw48sI+0nyyeAnc10ukfD4ySITcs0bfwkdKl3Z0RmkjjvLjnT9zGQ4qm7rnbg7h1r2K78CxRWLGAAOnIHrXCah4TuDdKIkUyOfmUnpTSZPtFc5uHAkQgc7uK6C9s573yty5wOtLL4P1K2VHREJ6kA1eZby3hSOdGRVHWtYuxzVUmzz0WyDWpVPBU1qgALgHpWczE61cvtO3PWtJEcx7zGdo71Enc2o7Ea5571SXTvtN4wOQDV0DHI9au6Zhp23rxVRHVWhg6npcmn2/moxwKk01nkt8tWv4oQf2cCFxzWZasv2dB04q5PQ5qC1Jgo6A1T1GNQMtzVwDB4NNe2F1KkbcBmAzWSOupH3TJCx9pAvtRXp48DWE1rFhDkDk+tFa3R57vc4OFjM7YGO3IrfsdKu5QPs1szuf4yMYrotJ0bTbZf8ATFEsp5VVrs9D0lJJFuFMkcQ/5Zk8VzuR6HNZHPaN4Xu7yBRchQAeeOa6c+HdP07a7Oi4HIxyatarqsGmQmC3KiRuSR2rDtYbzWmLM5CjoT3o03Zg9WaVpNo099tW2yw6E10cSLGAyoiIPTisTT9OstKl3Md9ww+Y9hTNa8RWNrbMhuFyR0B6VlUrKK0KUGzYee283eZlOO26sK8tLO7meeCXbMPSvP59bR7gmCVsH3rS0vUCHEgc56VyrFyTOlYXS7OwstJDYMkrFjVi98PxSQ42b+OhrEbVprNt+8Oo5GK1bbxFb3sG0zBJMdzitFi9NTKeGdzjNQ8DJ9oaWJMAnkVzWoaJd2hYMSFHYda9US/MrMhGe2c9abcaPa6ku48SnvVU8Rcai4o8TdMNhkYMPbrUUckodtrlT712XirQrrTZ/NCbo+m4CuL1CJoomd5QuehNdVOVyaj0I9eup/7PVXbK1BZANaqwPWq9yHmssyOWXHBqSwb/AEVVx0rWRhR+IvHIqSA/6REf9oVArEnjtT1bLqOVyRzWR2PY9l0+eNrSIiVeY14orFSyRdNt2jdgSoyc+1FXY4ZWubukaBArR3VzEIgi8Bj1rrSI1tm8rCqV7VCNNiyokHmYHc8Ci8vILWEhycAdB3rklKyNlqcTdK15qK28b7n8wZUjqPrXXxxx2MGOFIHQVi2Ooi5mkkWyEES9HbqTTdavRHZvKJPnVDxXPKt0NVTOV8V+NI7WaS1tmAbHzODzmuEElzqM+4GR2Y5JNZRaXVNckMmdjOTXpGiWEUESgIOnWobVtTqhAoaf4duQFdzwa6i30pYIRkjNXI1VFAqXORmhRizTnaM+a2Aj+XOa5nUYJIsyxkgg12LjcDms65td6sCMrjNZygUpJ7nO6H4gnlumin42dMd69I067DornGzivL5Lb7HqiyKvWut0a4IYRt060k+UzqwTR2l/bQajaNDMBtYcGvFPGfh6WxmeGOMmNj9417LFJ+5UAZxVXVoIbyExyxh19cciu2lUOKaPnieOQwLbpE5IHJxT7VWjjCHAYetdf4ktjplxshjHlsOveuXZSfvfePNdnNdE04pD1cqcYBpzzHH3cYqDoevSlZyR0pI3a0Lf/CZ6hCiwh8qnAorGa2yxbPWitDklDU+qVlIhU7ug5zXO65eeWV4BYn5RW1dyoAABj2rm9SikkuRMeWX5Qv8AWvIq1bs6acRsM8ksZeQgD+ED1rH1O8WbzQT0G01fnnMVu5K7WXG2uT85pnnDHnJNczfU64wucxa6eLbWZA3c7gPxrvrEHylwMYrnrqBX8m6X7wwG78Vu2l5bQopd+o6A5rWL5i0rG2gzwKm6dKzbTUYLmQqj8+4xV8Px7VorIzkrkpA6E8daoy3dmCyNJ8w9KlmJMf3sZ4rm7jULLRy4mYSSsc4xk1pZSROxJqsSSQebFziptLlzbxzKc44asu08Yaff3H2UxYVjjpVqCZNJ1I2r/wConOUPvWFSBSd0d5Y3Akt1IGccHFXzCZVKx4Kkc1zVpcS2UxzzG3JxXSafOkoBVwFNKnKzOepE8v8AG+h6pPqCm2QtHtwfauYbS723iaV0xGRgZHOa+hl0+BmDud3fnvXK+Lf7N09TKLbfJ0Xsqe9epBpo5k2meIOhjlIbPuD2NRysqJyRgdea1tTvjLcOyxxlD3UVjSrujY8etWjfm0IRdQHqwoqh8gY/uyR7CitLHO6iufTtyHnmGGIH0qreyQW5OXzIOlWZ5hGAhZtwHJrl7y58y82hSx6V89KV2d8IEOq3jPtUcdzWBACgkc87s1p3WVV5H44OBWerg2e5fxrO9zpgiK2Q3Vrs3bPmxn1q7v07SolMigvjueTVSzUQ2bO/TeSDWdaWk1xqbXUyLMo4Cv0xXVTaJmmy7b+KtPfUHXZsYHAro7bUllYKB8tcqfDtq90020bmOcDtW5a2nlMMA8Vo0mZ2aNfUN4gVk5zXILbyHUGlnRWznG4Z4ruIY/Ot9pHSoJoIh8rjA+laRVkJ6nM2WgWSymZQpYncQO1amoaQL/TZYkJDhcxt3BFacdrbphkHPfFW0RRH8pxngVMtQtY5rwrrr3NmbS9H76AlDnqcV1FoQGBR8ZPArzaTdYeOrhEJ2uAce9dvbOSqsW24x0rkqe7LQbhdHe2LM8KiTqKoeI9MtNQsJBcLuUDoOtQafcShOW7cEU/XpXOiSrD/AKzaeTXXh619DilG0jwzW1sY7gxWkMqYJByRg1lHG1h0yKvXayC4czp84J5HSqJyFYkZr0EyktDX0bTlmsstEGOeuKKtaHr1tY6csTjLZ5zRVXZySirnrOqQOjM3JPXiuYhuS1+wb5cGup16J0XBYkn0Nclc2ckTK5wgfk5PNfP1NGetRdypq8u+Ty15JNVJV8uDylHNTqN8jzkEKvC571GuZJ0z1ask7nXYLmMfZ4oBxnmpYLV8bUPFMnP+mqh7Cte0hwuQa6YEsLayWMZY5NSNuLhI1qZzsXOMGqUzvnKkhu2DWqZFjWgJ24DAH0qOe7RiY2TJHesZbuWAnnLfWpI7nJ3OcnrxWikJxSLccpSTOflPar8bqy71rCudUs7SeOOVykj/AHUP8VX7CUsXC8qf0pN2FZM5XW1A8WiXHVRXT2EgkURMOawdUiEniQN2Ra0bSQ71mXoTiueWrHy2R2FlJsjUnoOKg1/UzBbfZFX5ZuN3pTbZgwG77pFWprVJNx8suoXgntWtBWZxVErni+rRpDeuvmMWyaySTsODk+lbHiaKGHWJl87e+cgDtWGXRh94A9z616sVoRzJIjM6xdVyaKr3XDjHP0oraxzNq59JazuCl3I3Y4FcPLHLd3gMjNt9z0rtNXPmEjBPrXNvD+8IXj0r5qq9T1aL0KMg37o0I2JgfWo0jUSBzwinrVqZPJxGi5J+8azdauEtLBlL8MKzgjociS4AaXzscZwDWxZH9yCTXFrqTDw3JcEktGwPPpmul0O+ivtOjljbIYDPtXSk0iFJMv3E8cCvJKCUA7Vz9n4msb69a3yYiDgM4xXQzRCSMgDGO/rWPPolldtmeEB+xXitYeYGvFYWbtmS5TketPNzpNpGyIPNlU+nX2rHj0J4OMb1/hGTV+306TowVR6YrRJImRSOnLqOrtqdwq4Rf3SY+7WvagRRsSOSe1SMqwxhE5NQXMq29s7HghTRO1iFe5gTHfqN1Kedoxmk0O9Bme2c9DxVeNt9rM5bBkJzWbZOUugSdrA/Kf71c6RcmemWiExgZ+XvXRpAJbNgHAyuK4/SLnzEUM+1u4NdjYuPKA+9WtJ2ZyVY9Tybx34eSzDyQQFpH5d89q8tmDJM/J29vavp/Ubd7pOLNJQc53ivEPGGnwW2syBUVPUDtXpU5HJy3OLEj4+8aKuFYV4JFFdFyOU+mtQjG89BXP3LRxnAxuFdBqDEnsc965u8RC5VfvV81WWp6dEzZZY4iWbl88Vx2trLqNx5a5AB6dq6e6QsG3EAjpWVL5dvvbIL7c1NNM62tDlPEcx07Qlsg2HlOD9KreCNflsLwW0pJhYY57VL4hi/tC3E6g/Lx+NZWl2DQjzXODu/KvRi042OWz5j22OdbiAFTxjio3QnoSK57RtSBhVS+eldHFKjjNYO6Z0pdhRO4XGTkdzSq0jclqfsUrmmbStUpEtDgrbt2e9ZWrymRWjXua023BTzWfPHvVietDdxJGOsRVHjwCCprmxcPDd7XJKNynqprrFjEsmzdh81yd+QuqTW8h8ts5jf39KIq5M1qdVpOuQoqbyGPv1r0bw7di9j8yH5gOozXjGkadLf6lGnlkHPzHNezeGdIi0WMgTDL84JranRbZlWfu6Gre38cSNBJmPI+9Xhnjb7O2r7oPnX+I5r6BntLa/tTHOodWGMjrXlfin4bXSTtcaaTLGx+4eSK7FBxOBTSPHZ7fLnCk89qK9E07wpeQSSpd6fJntkUVqLnPTppMxlcZ461z94oU7wTuJrpYDC0edw+cZBzWTqVoxV2XBB+7ivFq03c76ckcTqDTSXbgE7AKpiMTEpn58Vu3FoY3yV92NULm28i8EyfcK7ie2B2rKGmh03OVtgy3M0TjMeeVq7/Yj6jCFiXy48nketXYtNa61EfZ+ftB/nWtf6zaeHmXTrGMS3S487PIX1rspQe5EmrHH6U01pcyWkuQ8R4z3rsbG7JGG61V8TWImtbPW7eML5n+s29jVewm3Kjc89TRWi9zSnLSx1kMgYVPxisy2l+Uc1cEmRxWCWg5DpOlU5h8pOasFs1VmbPApolMxbxpFIeFtrq2R7+1Zt9DZ6tLvWQQXgGHV+9bcqDPAyT+lFl4bTWL6MFOFOXYdcVrTi2zOoy/4E0gxTvNI2/bwpPpXU7HNwZWY8GrltZR2MSR264VVCj1NIYiPqa9KkrIyU+5NbXcsJypJH1rctL5JUG44NYKRHHpUqN5RHBNavUxqQUtjpdkb8lVb3Ioqtay+ZEMcUVJxuGp4ha6/dTWMkecKn3a7DwxftqellHHzL/EaKK4qiR2QI9WgAG0EYCk/iKxrmFZtL8lvUNkfyoorhaVztjsS6WqWGn3moldxiiKqo7Y715HZ6pNdeI/Pm+fz5DuzRRXfS+Exl8R7ZpFrHfeFzaSjKMcHNcoLX7DcvAW3KhIXFFFKpsaQ+I0ocYBFWg5oorlZtMUsSKjJyDRRUozZAV/i75xXbaHZR2lmjqMs/U0UV00DGoaDSlieMY4pY1DdaKK9COxzE+wUwoC1FFMi7LlnlQwzRRRQZH//Z",
        "last name": "Whitfoot",
        "phone number": "666-666-6666"
    }
}
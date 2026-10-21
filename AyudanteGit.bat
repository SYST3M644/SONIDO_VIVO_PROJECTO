@echo off
chcp 65001 >nul
title Sonido Vivo - Ayudante de Git
cd /d "%~dp0"

:menu
cls
echo ==========================================
echo      SONIDO VIVO - Ayudante de Git
echo ==========================================
echo.

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo  ERROR: esta carpeta no es un repositorio.
    echo  Deja este archivo dentro de SONIDO_VIVO_PROJECTO.
    echo.
    pause
    exit /b
)

set USUARIO=
for /f "delims=" %%u in ('git config user.name 2^>nul') do set USUARIO=%%u
if "%USUARIO%"=="" goto configurar

echo  Trabajando como: %USUARIO%
echo.
echo    1. Actualizar el proyecto
echo    2. Subir mis cambios
echo    3. Ver que archivos cambie
echo    4. Salir
echo.
set OPCION=
set /p OPCION=Elige una opcion del 1 al 4: 

if "%OPCION%"=="1" goto actualizar
if "%OPCION%"=="2" goto subir
if "%OPCION%"=="3" goto estado
if "%OPCION%"=="4" exit /b
goto menu


:configurar
echo  Primero hay que configurar quien eres.
echo.
set NOMBRE=
set /p NOMBRE=Tu nombre y apellido: 
set CORREO=
set /p CORREO=Tu correo de GitHub: 
if "%NOMBRE%"=="" goto menu
if "%CORREO%"=="" goto menu
git config user.name "%NOMBRE%"
git config user.email "%CORREO%"
echo.
echo  Listo. Tus commits van a salir a tu nombre.
echo.
pause
goto menu


:actualizar
cls
echo  Trayendo los cambios del equipo...
echo.
git pull --rebase
if errorlevel 1 goto problema
echo.
echo  Proyecto actualizado.
echo.
pause
goto menu


:estado
cls
echo  Archivos que cambiaste:
echo.
git status --short
echo.
echo  Si no aparece nada, no has cambiado nada todavia.
echo.
pause
goto menu


:subir
cls
echo  Revisando si hay cambios...
echo.

set CAMBIOS=
for /f "delims=" %%c in ('git status --porcelain') do set CAMBIOS=1

if not defined CAMBIOS (
    echo  No hay nada para subir. Ya esta todo guardado.
    echo.
    pause
    goto menu
)

echo  Se van a subir estos archivos:
echo.
git status --short
echo.
set RESPUESTA=
set /p RESPUESTA=Esta bien? Escribe S para seguir o N para cancelar:

if /i not "%RESPUESTA%"=="S" (
    echo.
    echo  Cancelado. No se subio nada.
    echo.
    pause
    goto menu
)

echo.
echo  Escribe en una linea que hiciste.
echo  Ejemplo:  feat carrito: agregue el boton de comprar
echo.
set MENSAJE=
set /p MENSAJE=Mensaje:

if "%MENSAJE%"=="" (
    echo.
    echo  Cancelado: no escribiste nada.
    echo.
    pause
    goto menu
)

git add .

echo.
echo  Guardando...
git commit -m "%MENSAJE%"
if errorlevel 1 goto problema

echo.
echo  Trayendo cambios del equipo antes de subir...
git pull --rebase
if errorlevel 1 goto problema

echo.
echo  Subiendo a GitHub...
git push
if errorlevel 1 goto problema

echo.
echo ==========================================
echo   LISTO. Tus cambios ya estan en GitHub.
echo ==========================================
echo.
pause
goto menu


:problema
echo.
echo ==========================================
echo   ALGO SALIO MAL
echo ==========================================
echo.
echo   Lo mas probable es un conflicto: los dos
echo   cambiaron el mismo archivo.
echo.
echo   NO sigas a ciegas. Avisale a tu companero
echo   y lean juntos el mensaje de arriba.
echo.
echo   Para volver todo como estaba:
echo       git rebase --abort
echo.
pause
goto menu

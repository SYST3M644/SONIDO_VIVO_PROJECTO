@echo off
chcp 65001 >nul
title Sonido Vivo - Actualizar proyecto
cd /d "%~dp0"

echo ==========================================
echo    SONIDO VIVO - Actualizar proyecto
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

echo  Trayendo los cambios del equipo...
echo.
git pull --rebase

if errorlevel 1 (
    echo.
    echo ==========================================
    echo   ALGO SALIO MAL
    echo ==========================================
    echo.
    echo   Lo mas probable es un conflicto: los dos
    echo   cambiaron el mismo archivo.
    echo.
    echo   Para volver todo como estaba:
    echo       git rebase --abort
    echo.
    pause
    exit /b
)

echo.
echo ==========================================
echo   LISTO. Proyecto actualizado.
echo ==========================================
echo.
pause
